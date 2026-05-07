import { getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = getApp(); 
const db = getFirestore(app);

let currentSpread = 1;
let totalSpreads = 1;
let currentChapterTitle = ""; 
let currentChapterName = ""; 
window.currentChapterNum = 1; 

const bookFrame = document.getElementById('book-frame');
const spreadContainer = document.getElementById('spread-container');
const drawer = document.getElementById('magic-drawer');
const decEnglish = document.getElementById('dec-english');
const decUrdu = document.getElementById('dec-urdu');
const decExample = document.getElementById('dec-example');
const decExampleBox = document.getElementById('dec-example-box');
const decContent = document.getElementById('dec-content');
const pageFlipSound = new Audio('subjects/caf8_audit/features/assets/book curl.mp3');

/ REPLACE THIS EXISTING STYLE BLOCK
// 🔥 STEP 1: REPLACE EXISTING STYLE BLOCK 🔥
const style = document.createElement('style');
style.innerHTML = `
    .smart-line { 
        cursor: pointer; 
        transition: all 0.3s ease-in-out; 
        border-bottom: 2px solid transparent; 
        padding-bottom: 1px; 
    } 
    .smart-line:hover { 
        border-bottom: 2px dotted #b88645; 
        background-color: transparent !important; 
    } 
    .smart-line.active { 
        background-color: transparent !important; 
        border-bottom: 2px dashed #b88645; 
        color: #000; 
        font-weight: bold; 
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => loadChapter(1));

window.openTocDrawer = function() {
    document.getElementById('toc-drawer').classList.add('open');
};
window.closeTocDrawer = function() {
    document.getElementById('toc-drawer').classList.remove('open');
};
window.loadSpecificChapter = function(chapterNumber) {
    closeTocDrawer();
    loadChapter(chapterNumber);
};

async function loadChapter(chapterNumber) {
    spreadContainer.innerHTML = `
        <div class="load-message">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <strong>Loading Chapter ${chapterNumber}...</strong>
        </div>`;
    
    try {
        window.currentChapterNum = parseInt(chapterNumber); 

        if (document.fonts) await document.fonts.ready;

        const chapterData = await fetchChapterJson(chapterNumber);
        currentChapterTitle = chapterData.source?.title || `Chapter ${chapterNumber}`;
        currentChapterName = chapterData.source?.chapter || `Chapter ${chapterNumber}`;
        
        renderBook(chapterData);
        bindSmartLines();
        updateNavigation();
    } catch (error) {
        showLoadError(error, chapterNumber);
    }
}

async function fetchChapterJson(chapterNumber) {
    let path = `subjects/caf8_audit/features/assets/book/chp${chapterNumber}.json`;
    let response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) {
        path = `chp${chapterNumber}.json`; 
        response = await fetch(path, { cache: 'no-store' });
    }
    if (!response.ok) {
        throw new Error('Chapter JSON file not found: ' + path);
    }
    return await response.json();
}

// REPLACE EXISTING renderBook FUNCTION
function renderBook(data) {
    const spreads = [];
    
    // Cover Page Sirf Chapter 1 pe show hoga
    if (window.currentChapterNum === 1) {
        spreads.push(renderCoverSpread(data));
    }

    const pages = paginateChapter(data);
    for (let i = 0; i < pages.length; i += 2) {
        const leftPage = pages[i];
        const rightPage = pages[i + 1];
        spreads.push(renderContentSpread(spreads.length + 1, leftPage, rightPage, data));
    }

    totalSpreads = spreads.length;
    currentSpread = 1;
    spreadContainer.innerHTML = spreads.join('');
    
    // Agar chapter 1 hai to layout thora different hoga cover ki wajah se
    if (window.currentChapterNum === 1) {
        bookFrame.classList.add('cover-mode');
    } else {
        bookFrame.classList.remove('cover-mode');
    }
}

function renderCoverSpread(data) {
    return `
        <div class="book-spread active" id="spread-1" data-chp="AUDIT">
            <div class="page-left blank-page"></div>
            <div class="page-right cover-content">
                <i class="fa-solid fa-scale-balanced" style="font-size: 3.5rem; color: var(--accent-blue); margin-bottom: 20px;"></i>
                <h1 class="book-title" style="font-size: 4rem; letter-spacing: 2px;">AUDIT</h1>
                <p class="cover-subtitle">An Interactive Guide to Core Auditing Concepts</p>
                <div class="cover-author">Audit by Caversity</div>
                <div class="page-num-right">1</div>
            </div>
        </div>
    `;
}

function paginateChapter(data) {
    const sourcePages = Array.isArray(data.pages) ? data.pages : [];
    const displayPages = [];
    
    const measureSpread = document.createElement('div');
    measureSpread.className = 'book-spread active';
    measureSpread.style.cssText = 'position: absolute; width: 100%; height: 100%; visibility: hidden; z-index: -1000; top: 0; left: 0; display: flex; flex-direction: row;';

    const measurePage = document.createElement('div');
    measurePage.className = 'page-right'; 
    measurePage.style.cssText = 'height: 100%; overflow: auto;'; 
    
    measureSpread.appendChild(measurePage);
    bookFrame.appendChild(measureSpread);

    let currentPage = null;

    sourcePages.forEach(sourcePage => {
        if (currentPage && currentPage.items.length) {
            displayPages.push(currentPage);
        }

        currentPage = createDisplayPage(sourcePage.heading || 'Chapter Page', true);
        const groups = buildPageGroups(sourcePage);

        groups.forEach(group => {
            const previousItems = currentPage.items.slice();
            currentPage.items.push(...group.items);
            measurePage.innerHTML = renderMeasuredPage(currentPage);

            if (measurePage.scrollHeight > measurePage.clientHeight + 2) { 
                currentPage.items = previousItems;

                if (currentPage.items.length) {
                    displayPages.push(currentPage);
                }

                currentPage = createDisplayPage(sourcePage.heading || 'Chapter Page', false);
                currentPage.items.push(...group.items);
                measurePage.innerHTML = renderMeasuredPage(currentPage);
            }
        });
    });

    if (currentPage && currentPage.items.length) {
        displayPages.push(currentPage);
    }

    measureSpread.remove(); 
    displayPages.forEach((page, index) => {
        page.page = index + 2;
    });

    return displayPages;
}

function createDisplayPage(heading, showHeading = true) {
    return { page: 0, heading, showHeading, items: [] };
}

function buildPageGroups(page) {
    const groups = [];
    const sections = Array.isArray(page?.sections) ? page.sections : [];

    sections.forEach(section => {
        const currentSectionTitle = section?.title || '';
        const paragraphs = Array.isArray(section?.paragraphs) ? section.paragraphs : [];
        const paragraphItems = paragraphs.map(paragraph => ({
            type: 'paragraph',
            text: paragraph,
            context: currentSectionTitle
        }));

        if (section?.title && paragraphItems.length) {
            groups.push({ items: [{ type: 'sectionTitle', text: section.title }, paragraphItems[0]] });
            paragraphItems.slice(1).forEach(item => groups.push({ items: [item] }));
        } else if (section?.title) {
            groups.push({ items: [{ type: 'sectionTitle', text: section.title }] });
        } else {
            paragraphItems.forEach(item => groups.push({ items: [item] }));
        }
    });

    return groups;
}

function renderMeasuredPage(page) {
    const headingHtml = page.showHeading ? `<h1 class="book-title">${escapeHtml(page.heading || 'Chapter Page')}</h1>` : '';
    return `
        <span class="chapter-header">${escapeHtml(currentChapterName)}</span>
        ${headingHtml}
        ${page.items.map(renderPageItem).join('')}
    `;
}

function renderContentSpread(spreadNumber, leftPage, rightPage, data) {
    return `
        <div class="book-spread" id="spread-${spreadNumber}" data-chp="${escapeHtml(data.source?.title || '')}">
            ${renderPage(leftPage, 'left')}
            ${rightPage ? renderPage(rightPage, 'right') : renderBlankPage('right')}
        </div>
    `;
}

function renderPage(page, side) {
    const sideClass = side === 'left' ? 'page-left' : 'page-right';
    const pageNumClass = side === 'left' ? 'page-num-left' : 'page-num-right';
    const pageNumber = page?.page ?? '';
    const heading = escapeHtml(page?.heading || 'Chapter Page');
    const items = Array.isArray(page?.items) ? page.items : [];
    const contentHtml = items.map(renderPageItem).join('');
    const headingHtml = page?.showHeading === false ? '' : `<h1 class="book-title">${heading}</h1>`;

    return `
        <div class="${sideClass}">
            <span class="chapter-header">${escapeHtml(currentChapterName)}</span>
            ${headingHtml}
            ${contentHtml}
            <div class="${pageNumClass}">${escapeHtml(pageNumber)}</div>
        </div>
    `;
}

function renderBlankPage(side) {
    const sideClass = side === 'left' ? 'page-left' : 'page-right';
    const nextChp = window.currentChapterNum + 1;
    return `
        <div class="${sideClass} blank-page">
            <i class="fa-solid fa-check-circle" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 15px;"></i>
            <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 20px;">End of Chapter ${window.currentChapterNum}</p>
            ${nextChp <= 16 ? `<button onclick="loadSpecificChapter(${nextChp})" style="background: var(--accent-blue); color: white; border: none; padding: 10px 22px; border-radius: 50px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(37,99,235,0.3); transition: transform 0.2s;">Turn Page to Start Chapter ${nextChp} <i class="fa-solid fa-arrow-right"></i></button>` : '<p>Course Completed!</p>'}
        </div>
    `;
}

function renderPageItem(item) {
    if (item.type === 'chapterMainTitle') {
        return `<div style="text-align:center; margin-bottom:25px; padding-bottom:15px; border-bottom:2px solid #e2e8f0;"><h2 style="color:var(--accent-blue); font-size:1.3rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin:0;">${escapeHtml(item.text)}</h2></div>`;
    }
    if (item.type === 'sectionTitle') {
        return `<h2 class="section-title">${escapeHtml(item.text)}</h2>`;
    }
    if (item.type === 'paragraph') {
        let text = item.text || '';
        
        // Bullet points detect karne ka logic (* ya - se shuru hone wali line)
       const isBullet = /^[*\-•]\s/.test(text.trim());
        if (isBullet) {
            text = text.trim().substring(1).trim(); // Remove the '*' or '-' 
            return `<ul style="margin-left: 20px; margin-bottom: 10px; list-style-type: disc;"><li class="reading-text" style="margin-bottom: 5px;">${renderInteractiveParagraph(text, item.context)}</li></ul>`;
        }
        
        return `<p class="reading-text">${renderInteractiveParagraph(text, item.context)}</p>`;
    }
    return '';
}

function renderInteractiveParagraph(text, context) {
    const rawText = String(text || '');
    const sentences = rawText.match(/[^.!?]+[.!?]*/g) || [rawText];
    
    return sentences.map(sentence => {
        let trimmed = sentence.trim();
        if (!trimmed) return '';
        
        const hashId = "line_" + Math.abs(hashCode(trimmed)).toString(36);
        
        // JSON ke **bold** text ko real Bold (strong) mein convert karna
        let formattedText = escapeHtml(trimmed).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return `<span class="smart-line" data-id="${hashId}" data-context="${escapeHtml(context || '')}" data-english="${escapeHtml(trimmed)}">${formattedText} </span>`;
    }).join('');
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

function bindSmartLines() {
    document.querySelectorAll('.smart-line').forEach(line => {
        line.addEventListener('click', async function(event) {
            event.stopPropagation();
            document.querySelectorAll('.smart-line').forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const lineId = this.getAttribute('data-id');
            const lineContext = this.getAttribute('data-context');
            const englishText = this.getAttribute('data-english') || this.innerText;

            decEnglish.innerText = '"' + englishText + '"';
            decUrdu.innerText = "⏳ AI is decoding this concept...";
            decExample.innerText = "";
            decExampleBox.style.display = 'none';
            decContent.style.display = 'block';
            drawer.classList.add('open');

            try {
                const docRef = doc(db, "book_decodes", lineId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    decUrdu.innerText = data.urdu;
                    if (data.example) {
                        decExample.innerText = data.example;
                        decExampleBox.style.display = 'block';
                    }
                } else {
                    const aiResponse = await callGrokForDecode(englishText, currentChapterTitle, lineContext);
                    
                    await setDoc(docRef, {
                        english: englishText,
                        urdu: aiResponse.urdu,
                        example: aiResponse.example,
                        created_at: new Date()
                    });

                    decUrdu.innerText = aiResponse.urdu;
                    if (aiResponse.example) {
                        decExample.innerText = aiResponse.example;
                        decExampleBox.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error("AI Decoder Error:", error);
                decUrdu.innerText = "⚠️ Connection error or API issue. Please try again.";
            }
        });
    });
}

// 🔥 SEAMLESS CHAPTER FLOW LOGIC ADDED HERE 🔥
function turnSpread(direction) {
    // Agar chapter k aakhri page pe next dabaya jaye
    if (direction === 1 && currentSpread >= totalSpreads) {
        if (window.currentChapterNum < 16) {
            loadSpecificChapter(window.currentChapterNum + 1);
        }
        return;
    }
    
    // Agar chapter k pehle page pe previous dabaya jaye
    if (direction === -1 && currentSpread <= 1) {
        if (window.currentChapterNum > 1) {
            loadSpecificChapter(window.currentChapterNum - 1);
        }
        return;
    }

    pageFlipSound.currentTime = 0;
    pageFlipSound.play().catch(() => {});

    document.querySelectorAll('.book-spread').forEach(spread => {
        spread.classList.remove('active', 'flip-anim');
    });

    currentSpread += direction;
    bookFrame.classList.toggle('cover-mode', currentSpread === 1);

    const newSpread = document.getElementById(`spread-${currentSpread}`);
    if (newSpread) {
        newSpread.classList.add('active', 'flip-anim');
    }

    updateNavigation();
    closeDrawer();
}

// 🔥 NAVIGATION UPDATE: Show next/prev buttons at chapter edges for continuous flow
function updateNavigation() {
    const isVeryFirstPage = (currentSpread === 1 && window.currentChapterNum === 1);
    const isVeryLastPage = (currentSpread === totalSpreads && window.currentChapterNum === 16);
    
    document.getElementById('btn-prev').style.display = isVeryFirstPage ? 'none' : 'block';
    document.getElementById('btn-next').style.display = isVeryLastPage ? 'none' : 'block';
}

function closeDrawer() {
    drawer.classList.remove('open');
    document.querySelectorAll('.smart-line').forEach(line => line.classList.remove('active'));
    setTimeout(() => {
        decContent.style.display = 'none';
        decExampleBox.style.display = 'none';
        decEnglish.innerText = 'Click on any dashed line in the book to see its meaning.';
    }, 400);
}

function showLoadError(error, chapterNumber) {
    spreadContainer.innerHTML = `
        <div class="load-message">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <strong>Chapter ${chapterNumber} Load Nahi Hua</strong>
            <span>File <b>chp${chapterNumber}.json</b> missing hai.</span>
            <span style="font-size: 0.8rem; opacity: 0.75;">${escapeHtml(error?.message || 'Unknown error')}</span>
        </div>
    `;
    totalSpreads = 1;
    updateNavigation();
}

function escapeHtml(value) {
    return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// 🔥 STEP 3: REPLACE ENTIRE callGrokForDecode FUNCTION 🔥
async function callGrokForDecode(englishText, chapterTitle, lineContext) {
    const API_KEY = "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"; 
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Prompt mein 'expert in auditing standards' add kar diya hai
    const prompt = `
You are an expert CA Audit Tutor and an expert in auditing standards. We are studying "${chapterTitle}".
[CURRENT TOPIC]: "${lineContext}"
[TEXT TO EXPLAIN]: "${englishText}"

Explain the [TEXT TO EXPLAIN] in easy Roman Urdu (1-2 lines). Provide a short practical corporate example.
Return ONLY a valid JSON object in this format:
{"urdu": "asaan urdu explanation here", "example": "practical corporate example here"}
`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // 🔥 Naya fast aur smart model
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5,
                max_tokens: 300 
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "API Error: " + response.status);
        }
        
        const json = await response.json();
        if (!json || !json.choices || json.choices.length === 0) {
            throw new Error("Invalid AI Response format");
        }
        
        let content = json.choices[0].message.content;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) content = jsonMatch[0];
        else content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(content);
        
    } catch (error) {
        console.error("Grok API Error Details:", error);
        throw error; 
    }
}

window.turnSpread = turnSpread;
window.closeDrawer = closeDrawer;
