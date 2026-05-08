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
    .page-left, .page-right {
        overflow-y: auto !important;
        overflow-x: hidden !important;
    }
    .page-left::-webkit-scrollbar, .page-right::-webkit-scrollbar { width: 4px; }
    .page-left::-webkit-scrollbar-thumb, .page-right::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

    /* 🔥 Page Numbers ko Bottom se Top par shift kiya 🔥 */
    .page-num-left {
        position: absolute !important;
        top: 25px !important;
        bottom: auto !important;
    }
    .page-num-right {
        position: absolute !important;
        top: 25px !important;
        bottom: auto !important;
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
// 🔥 LAYOUT FIX: LOAD WITH STRICTOR DELAY 🔥
async function loadChapter(chapterNumber) {
    spreadContainer.innerHTML = `<div class="load-message"><i class="fa-solid fa-spinner fa-spin"></i><strong>Loading...</strong></div>`;
    
    try {
        window.currentChapterNum = parseInt(chapterNumber); 

        if (document.fonts) await document.fonts.ready;
        // 500ms delay taake browser ka layout engine thanda ho jaye
        await new Promise(res => setTimeout(res, 500)); 

        const chapterData = await fetchChapterJson(chapterNumber);
        currentChapterTitle = chapterData.source?.title || `Chapter ${chapterNumber}`;
        currentChapterName = chapterData.source?.chapter || `Chapter ${chapterNumber}`;
        
        renderBook(chapterData);
        bindSmartLines();
        updateNavigation();
        
        // Ek dafa force layout recalculation
        window.dispatchEvent(new Event('resize'));
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


// 🔥 STEP 1: REPLACE renderBook FUNCTION 🔥
function renderBook(data) {
    const spreads = [];
    
    // Ab cover page HAR chapter pe aayega
    spreads.push(renderCoverSpread(data));

    const pages = paginateChapter(data);
    for (let i = 0; i < pages.length; i += 2) {
        spreads.push(renderContentSpread(spreads.length + 1, pages[i], pages[i + 1], data));
    }

    totalSpreads = spreads.length;
    currentSpread = 1; 
    spreadContainer.innerHTML = spreads.join('');
    
    // Har naya chapter load hone par cover-mode on kar do
    bookFrame.classList.add('cover-mode');

    document.querySelectorAll('.book-spread').forEach(s => s.classList.remove('active', 'flip-anim'));
    const firstSpread = document.getElementById('spread-1');
    if (firstSpread) {
        firstSpread.classList.add('active', 'flip-anim');
    }
}
// 🔥 STEP 3: REPLACE turnSpread FUNCTION 🔥
function turnSpread(direction) {
    // Auto-Next chapter pe jana band kar diya hai
    if (direction === 1 && currentSpread >= totalSpreads) return;
    if (direction === -1 && currentSpread <= 1) return;

    pageFlipSound.currentTime = 0;
    pageFlipSound.play().catch(() => {});

    document.querySelectorAll('.book-spread').forEach(s => s.classList.remove('active', 'flip-anim'));
    currentSpread += direction;

    // Jab spread 1 (Cover Page) ho to cover mode lagao, warna hata do
    if (currentSpread === 1) {
        bookFrame.classList.add('cover-mode');
    } else {
        bookFrame.classList.remove('cover-mode');
    }

    const nextOne = document.getElementById(`spread-${currentSpread}`);
    if (nextOne) nextOne.classList.add('active', 'flip-anim');
    updateNavigation();
}

// 🔥 STEP 2: REPLACE renderCoverSpread FUNCTION 🔥
function renderCoverSpread(data) {
    return `
        <div class="book-spread active" id="spread-1" data-chp="${escapeHtml(currentChapterName)}">
            <div class="page-left blank-page"></div>
            <div class="page-right cover-content">
                <i class="fa-solid fa-scale-balanced" style="font-size: 3.5rem; color: var(--accent-blue); margin-bottom: 20px;"></i>
                <h1 class="book-title" style="font-size: 4rem; letter-spacing: 2px;">AUDIT</h1>
                
                <p class="cover-subtitle" style="font-size: 1.3rem; color: var(--accent-blue); font-weight: 800; margin-bottom: 8px;">${escapeHtml(currentChapterName)}</p>
                <p class="cover-subtitle" style="font-size: 1.1rem; line-height: 1.4; padding: 0 20px;">${escapeHtml(currentChapterTitle)}</p>
                
                <div class="cover-author" style="margin-top: 35px;">Audit by Caversity</div>
                <div class="page-num-right">1</div>
            </div>
        </div>
    `;
}
// 🔥 STEP 2: REPLACE paginateChapter FUNCTION 🔥
function paginateChapter(data) {
    const sourcePages = Array.isArray(data.pages) ? data.pages : [];
    const displayPages = [];
    
    const measureSpread = document.createElement('div');
    measureSpread.className = 'book-spread active';
    measureSpread.style.cssText = 'position: absolute; width: 100%; height: 100%; visibility: hidden; z-index: -1000; top: 0; left: 0; display: flex;';

    const measurePage = document.createElement('div');
    measurePage.className = 'page-right'; 
    // Inline math hata diya, ab yeh exactly CSS file ki 80px padding uthayega
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

            // Strict measurement based purely on CSS
            if (measurePage.scrollHeight > measurePage.clientHeight) { 
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

// 🔥 STEP 4: REPLACE renderBlankPage FUNCTION 🔥
function renderBlankPage(side) {
    const sideClass = side === 'left' ? 'page-left' : 'page-right';
    
    return `
        <div class="${sideClass} blank-page" style="text-align: center;">
            <h2 style="color: var(--accent-blue); font-size: 2.2rem; margin-bottom: 10px; font-family: 'Merriweather', serif;">The End</h2>
            <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 25px; color: #64748b;">${escapeHtml(currentChapterName)} Completed</p>
            <p style="color: #d97706; font-size: 0.95rem; font-style: italic;">Please select the next chapter from the Table of Contents.</p>
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
        
        // Table detection logic
        if (text.trim().startsWith('|') && text.includes('|---')) {
            return renderTable(text, item.context);
        }

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

function renderTable(mdText, context) {
    let lines = mdText.trim().split('\n').map(l => l.trim()).filter(l => l);
    let html = '<div style="margin-bottom: 20px; width: 100%; overflow-x: auto;"><table class="audit-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 0.85rem; text-align: left; line-height: 1.4;">';
    let isBody = false;
    
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if(line.includes('|---|') || line.includes('|---')) {
            isBody = true; 
            continue;
        }
        
        let cells = line.split('|');
        if(cells.length > 0 && cells[0].trim() === '') cells.shift();
        if(cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
        
        html += '<tr style="border-bottom: 1px solid #e2e8f0;">';
        cells.forEach(cell => {
            let c = cell.trim();
            let isHeader = !isBody;
            
            // 🔥 Table ke andar line breaks aur bullets ka clean parser 🔥
            c = c.replace(/&lt;br\s*\/?[&gt;>]/gi, '<br>').replace(/<br\s*\/?>/gi, '<br>');
            let linesInCell = c.split('<br>');
            let formattedLines = linesInCell.map(line => {
                let l = line.trim();
                if (!l) return '';
                
                if (l.startsWith('* ') || l.startsWith('- ')) {
                    l = '• ' + l.substring(2).trim();
                }
                
                return renderInteractiveParagraph(l, context);
            }).filter(l => l !== '');
            
            let cellHtml = formattedLines.join('<br>');
            
            if (isHeader) {
                html += `<th style="padding: 10px 12px; background: #f8fafc; color: #0f172a; border-right: 1px solid #cbd5e1; font-weight: 700;">${cellHtml}</th>`;
            } else {
                html += `<td style="padding: 10px 12px; color: #334155; border-right: 1px solid #cbd5e1; vertical-align: top;">${cellHtml}</td>`;
            }
        });
        html += '</tr>';
    }
    html += '</table></div>';
    return html;
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

// 🔥 STEP 3: REPLACE bindSmartLines FUNCTION (BULLETPROOF FIREBASE) 🔥
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

            let foundInFirebase = false;

            // 1st Try: Firebase se check karo (Agar net issue hua to crash nahi hoga)
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
                    foundInFirebase = true;
                }
            } catch (firebaseError) {
                console.warn("Firebase Offline/Error. Direct AI ko call kar rahay hain...");
                // Yahan error ko ignore kar diya taake next step (AI) chal sake
            }

            // 2nd Try: Agar Firebase mein nahi mila ya Firebase offline tha
            if (!foundInFirebase) {
                try {
                    const aiResponse = await callGrokForDecode(englishText, currentChapterTitle, lineContext);
                    
                    decUrdu.innerText = aiResponse.urdu;
                    if (aiResponse.example) {
                        decExample.innerText = aiResponse.example;
                        decExampleBox.style.display = 'block';
                    }

                    // Answer aane k baad background mein save karne ki koshish karo
                    try {
                        const docRef = doc(db, "book_decodes", lineId);
                        await setDoc(docRef, {
                            english: englishText,
                            urdu: aiResponse.urdu,
                            example: aiResponse.example,
                            created_at: new Date()
                        });
                    } catch (saveError) {
                        console.log("Answer aa gaya, par Firebase mein save nahi ho saka (Offline).");
                    }

                } catch (apiError) {
                    console.error("AI API Error:", apiError);
                    decUrdu.innerText = "⚠️ Connection Issue: " + apiError.message;
                }
            }
        });
    });
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

// 🔥 STEP 3: GROK API RELIABILITY FIX 🔥
async function callGrokForDecode(englishText, chapterTitle, lineContext) {
    const GROQ_API_KEY = "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";
    
    const prompt = `You are Caversity AI, a CA Audit Expert. Explain this audit concept in 2 lines of Roman Urdu English mix and give 1 practical example(dont use any hindi word). Return ONLY JSON: {"urdu": "...", "example": "..."}. Context: ${chapterTitle} -> ${lineContext}. Text: "${englishText}"`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{"role": "user", "content": prompt}],
                temperature: 0.5
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        let aiReply = data.choices[0].message.content;
        const jsonMatch = aiReply.match(/\{[\s\S]*\}/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : aiReply);
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
}
window.turnSpread = turnSpread;
window.closeDrawer = closeDrawer;
