import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeIvzRYa7G2f0iqfpgmRaaRRoDDb-OBZ8",
    authDomain: "caversity-48b29.firebaseapp.com",
    projectId: "caversity-48b29",
    storageBucket: "caversity-48b29.firebasestorage.app",
    messagingSenderId: "836067330285",
    appId: "1:836067330285:web:b20c125a385f7a2107e4e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

        let currentSpread = 1;
        let totalSpreads = 1;
        let bookDatabase = {};
        let currentChapterTitle = ""; // Grok API ko context dene ke liye

        const bookFrame = document.getElementById('book-frame');
        const spreadContainer = document.getElementById('spread-container');
        const drawer = document.getElementById('magic-drawer');
        const decEnglish = document.getElementById('dec-english');
        const decUrdu = document.getElementById('dec-urdu');
        const decExample = document.getElementById('dec-example');
        const decExampleBox = document.getElementById('dec-example-box');
        const decContent = document.getElementById('dec-content');
        const pageFlipSound = new Audio('subjects/caf8_audit/features/assets/book curl.mp3');

        // Yahan par Default Chapter Load Hoga
        document.addEventListener('DOMContentLoaded', () => loadChapter(1));

        // Table of Contents Drawer Logic
        window.openTocDrawer = function() {
            document.getElementById('toc-drawer').style.transform = 'translateX(0)';
        };
        window.closeTocDrawer = function() {
            document.getElementById('toc-drawer').style.transform = 'translateX(-100%)';
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
                // 🔥 FIX 1: Wait for custom fonts to load so text measurement is 100% accurate
                if (document.fonts) await document.fonts.ready;

                const chapterData = await fetchChapterJson(chapterNumber);
                bookDatabase = chapterData.smart_lines || {};
                currentChapterTitle = chapterData.source?.title || `Chapter ${chapterNumber}`; // Save title for AI
                renderBook(chapterData);
                bindSmartLines();
                updateNavigation();
            } catch (error) {
                showLoadError(error, chapterNumber);
            }
        }

        async function fetchChapterJson(chapterNumber) {
            const path = `subjects/caf8_audit/features/assets/book/chp${chapterNumber}.json`;
                    const response = await fetch(path, { cache: 'no-store' });
                    if (!response.ok) {
                        throw new Error(path + ' returned ' + response.status);
                    }
                const result = await response.json();
                
                // 🔥 Encrypted Payload Base64 Decoding Logic
                if (result.payload) {
                    return JSON.parse(atob(result.payload));
                }
                return result; // Fallback directly agar raw JSON aye
        }

        function renderBook(data) {
            const spreads = [];
            spreads.push(renderCoverSpread(data));

            const pages = paginateChapter(data);
            for (let i = 0; i < pages.length; i += 2) {
                const leftPage = pages[i];
                const rightPage = pages[i + 1];
                spreads.push(renderContentSpread(spreads.length + 1, leftPage, rightPage, data));
            }

            totalSpreads = spreads.length;
            currentSpread = 1;
            spreadContainer.innerHTML = spreads.join('');
            bookFrame.classList.add('cover-mode');
        }

        function renderCoverSpread(data) {
            const title = escapeHtml(data.source?.title || 'Audit Chapter');

            return `
                <div class="book-spread active" id="spread-1" data-chp="${title}">
                    <div class="page-left blank-page"></div>
                    <div class="page-right cover-content">
                        <i class="fa-solid fa-scale-balanced" style="font-size: 3.5rem; color: var(--accent-blue); margin-bottom: 20px;"></i>
                        <h1 class="book-title">${title}</h1>
                        <p class="cover-subtitle">An Interactive Guide to Core Auditing Concepts</p>
                        <div class="cover-author">Audit by ATS</div>
                        <div class="page-num-right">1</div>
                    </div>
                </div>
            `;
        }

        function paginateChapter(data) {
            const sourcePages = Array.isArray(data.pages) ? data.pages : [];
            const displayPages = [];
            
            // 🔥 FIX 2: Wrap in a mock spread to guarantee exact CSS layout mimicking & restrict height
            const measureSpread = document.createElement('div');
            measureSpread.className = 'book-spread active';
            measureSpread.style.cssText = 'position: absolute; width: 100%; height: 100%; visibility: hidden; z-index: -1000; top: 0; left: 0;';

            const measurePage = document.createElement('div');
            measurePage.className = 'page-right measure-page';
            measurePage.style.height = '100%'; // Ensure tight boundary
            
            measureSpread.appendChild(measurePage);
            spreadContainer.appendChild(measureSpread);

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
            return {
                page: 0,
                heading,
                showHeading,
                items: []
            };
        }

        function buildPageGroups(page) {
            const groups = [];
            const sections = Array.isArray(page?.sections) ? page.sections : [];

            sections.forEach(section => {
                const paragraphs = Array.isArray(section?.paragraphs) ? section.paragraphs : [];
                const paragraphItems = paragraphs.map(paragraph => ({
                    type: 'paragraph',
                    text: paragraph
                }));

                if (section?.title && paragraphItems.length) {
                    groups.push({
                        items: [
                            { type: 'sectionTitle', text: section.title },
                            paragraphItems[0]
                        ]
                    });
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
                <span class="chapter-header">Chapter 1</span>
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
                    <span class="chapter-header">Chapter 1</span>
                    ${headingHtml}
                    ${contentHtml}
                    <div class="${pageNumClass}">${escapeHtml(pageNumber)}</div>
                </div>
            `;
        }

        function renderBlankPage(side) {
            const sideClass = side === 'left' ? 'page-left' : 'page-right';
            return `
                <div class="${sideClass} blank-page">
                    <i class="fa-solid fa-check-circle" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 15px;"></i>
                    <p style="font-size: 1.1rem; font-weight: 600;">End of Chapter</p>
                </div>
            `;
        }

        function renderPageItem(item) {
            if (item.type === 'sectionTitle') {
                return `<h2 class="section-title">${escapeHtml(item.text)}</h2>`;
            }

            if (item.type === 'paragraph') {
                return `<p class="reading-text">${renderInteractiveParagraph(item.text)}</p>`;
            }

            return '';
        }

        function renderInteractiveParagraph(text) {
            const rawText = String(text || '');
            // Split paragraph into sentences logically
            const sentences = rawText.match(/[^.!?]+[.!?]*/g) || [rawText];
            
            return sentences.map(sentence => {
                const trimmed = sentence.trim();
                if (!trimmed) return '';
                // Generate a unique 10-character ID based on the text hash
                const hashId = "line_" + Math.abs(hashCode(trimmed)).toString(36);
                return `<span class="smart-line" data-id="${hashId}" data-english="${escapeHtml(trimmed)}">${escapeHtml(trimmed)} </span>`;
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
                    const englishText = this.getAttribute('data-english') || this.innerText;

                    // 1. Loading State UI
                    decEnglish.innerText = '"' + englishText + '"';
                    decUrdu.innerText = "⏳ Caversity AI is decoding this standard...";
                    decExample.innerText = "";
                    decExampleBox.style.display = 'none';
                    decContent.style.display = 'block';
                    drawer.classList.add('open');

                    try {
                        // 2. Check Firebase Database
                        const docRef = doc(db, "book_decodes", lineId);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            // 🟢 FOUND IN DATABASE - Instant Load
                            const data = docSnap.data();
                            decUrdu.innerText = data.urdu;
                            if (data.example) {
                                decExample.innerText = data.example;
                                decExampleBox.style.display = 'block';
                            }
                        } else {
                            // 🔴 NOT IN DATABASE - Call Grok API
                            const aiResponse = await callGrokForDecode(englishText, currentChapterTitle);
                            
                            // Save to Firebase for future students
                            await setDoc(docRef, {
                                english: englishText,
                                urdu: aiResponse.urdu,
                                example: aiResponse.example,
                                created_at: new Date()
                            });

                            // Update UI
                            decUrdu.innerText = aiResponse.urdu;
                            if (aiResponse.example) {
                                decExample.innerText = aiResponse.example;
                                decExampleBox.style.display = 'block';
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        decUrdu.innerText = "⚠️ Connection error or AI limit reached. Please try again.";
                    }
                });
            });
        }

        function turnSpread(direction) {
            if (direction === 1 && currentSpread >= totalSpreads) return;
            if (direction === -1 && currentSpread <= 1) return;

            pageFlipSound.currentTime = 0;
            pageFlipSound.play().catch(() => {});

            document.querySelectorAll('.book-spread').forEach(spread => {
                spread.classList.remove('active', 'flip-anim');
            });

            currentSpread += direction;

            if (currentSpread === 1) {
                bookFrame.classList.add('cover-mode');
            } else {
                bookFrame.classList.remove('cover-mode');
            }

            const newSpread = document.getElementById(`spread-${currentSpread}`);
            if (newSpread) {
                newSpread.classList.add('active', 'flip-anim');
            }

            updateNavigation();
            closeDrawer();
        }

        function updateNavigation() {
            document.getElementById('btn-prev').style.display = currentSpread === 1 ? 'none' : 'block';
            document.getElementById('btn-next').style.display = currentSpread === totalSpreads ? 'none' : 'block';
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
                <span>File <b>subjects/caf8_audit/features/assets/book/chp${chapterNumber}.json</b> missing hai.</span>
                    <span style="font-size: 0.8rem; opacity: 0.75;">${escapeHtml(error?.message || 'Unknown error')}</span>
                </div>
            `;
            totalSpreads = 1;
            updateNavigation();
        }

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        async function callGrokForDecode(englishText, chapterTitle) {
            // Groq API Key
            const API_KEY = "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"; 
            const url = "https://api.groq.com/openai/v1/chat/completions";
            
            const prompt = `
            You are a CA Audit Tutor. We are currently studying the topic: "${chapterTitle}".
            Explain the following text in easy Roman Urdu (1-2 lines), and give a short corporate practical example related to this topic.
            Return ONLY a valid JSON object:
            {
                "urdu": "asaan urdu text",
                "example": "practical example"
            }
            Text: "${englishText}"
            `;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mixtral-8x7b-32768",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7
                })
            });

            if (!response.ok) throw new Error("API Error");
            const json = await response.json();
            let content = json.choices[0].message.content;
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(content);
        }

        document.addEventListener('click', function(event) {
            if (!drawer.contains(event.target) && drawer.classList.contains('open')) {
                closeDrawer();
            }
        });

        // Expose functions globally for inline HTML onclick events
        window.turnSpread = turnSpread;
        window.closeDrawer = closeDrawer;
    
