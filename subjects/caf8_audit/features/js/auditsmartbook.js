        let currentSpread = 1;
        let totalSpreads = 1;
        let bookDatabase = {};
        let CHAPTER_DATA = null;

        const bookFrame = document.getElementById('book-frame');
        const spreadContainer = document.getElementById('spread-container');
        const drawer = document.getElementById('magic-drawer');
        const decEnglish = document.getElementById('dec-english');
        const decUrdu = document.getElementById('dec-urdu');
        const decExample = document.getElementById('dec-example');
        const decExampleBox = document.getElementById('dec-example-box');
        const decContent = document.getElementById('dec-content');
        const pageFlipSound = new Audio('subjects/caf8_audit/features/assets/book curl.mp3');

        document.addEventListener('DOMContentLoaded', loadChapter);

        async function loadChapter() {
            try {
                const chapterData = await fetchChapterJson();
                CHAPTER_DATA = chapterData;
                bookDatabase = chapterData.smart_lines || {};
                renderBook(chapterData);
                bindSmartLines();
                updateNavigation();
            } catch (error) {
                showLoadError(error);
            }
        }

        // 📱 MOBILE RESPONSIVENESS FIX: Auto-recalculate pages if screen size changes
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (CHAPTER_DATA) {
                    renderBook(CHAPTER_DATA);
                    bindSmartLines();
                    updateNavigation();
                }
            }, 300);
        });

        async function fetchChapterJson() {
            const response = await fetch('/api/get-data?file=auditbook');
            if (!response.ok) throw new Error("API Connection Failed");
            const result = await response.json();
            
            // 🛠️ UTF-8 FIX: atob dabbon (boxes) aur special characters ko theek rakhega
            const decodedPayload = new TextDecoder("utf-8").decode(Uint8Array.from(atob(result.payload), c => c.charCodeAt(0)));
            return JSON.parse(decodedPayload);
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
            
            // 🛠️ FIX 1: Measure Page ko strict boundaries dena
            const measurePage = document.createElement('div');
            measurePage.className = 'page-right measure-page';
            // Inline styling to force strict height measurement
            measurePage.style.position = 'absolute';
            measurePage.style.visibility = 'hidden';
            measurePage.style.height = '100%'; 
            measurePage.style.maxHeight = '100%';
            measurePage.style.overflow = 'hidden';
            bookFrame.appendChild(measurePage);

            let currentPage = null;
            
            // 🛠️ FIX 2: Page number aur safe zone ke liye buffer (approx 50px)
            const bottomBuffer = 50; 

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

                    // 🛠️ FIX 3: Buffer apply karna in height checking
                    if (measurePage.scrollHeight > (measurePage.clientHeight - bottomBuffer)) {
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

            measurePage.remove();
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
                const smartIds = Array.isArray(section?.smart_line_ids) ? section.smart_line_ids : [];
                const paragraphItems = paragraphs.map((paragraph, index) => {
                    let paragraphSmartIds = smartIds.slice(index, index + 1);
                    if (index === paragraphs.length - 1 && smartIds.length > paragraphs.length) {
                        paragraphSmartIds = smartIds.slice(index);
                    }

                    return {
                        type: 'paragraph',
                        text: paragraph,
                        smartIds: paragraphSmartIds
                    };
                });

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
                <div class="${sideClass}" style="position: relative; height: 100%;">
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
                return `<p class="reading-text">${renderParagraphWithSmartLines(item.text, item.smartIds || [])}</p>`;
            }

            return '';
        }

        function renderParagraphWithSmartLines(text, smartIds) {
            const rawText = String(text || '');
            let html = escapeHtml(rawText);

            smartIds.forEach(id => {
                const data = bookDatabase[id];
                if (!data?.english) return;

                const smartText = escapeHtml(data.english);
                const smartHtml = `<span class="smart-line" data-id="${escapeHtml(id)}" data-english="${smartText}">${smartText}</span>`;

                if (html.includes(smartText)) {
                    html = html.replace(smartText, smartHtml);
                } else {
                    html = wrapExistingSentence(html, id);
                }
            });

            return html;
        }

        function wrapExistingSentence(html, id) {
            const sentenceMatch = html.match(/[^.!?]+[.!?]/);
            const sentence = sentenceMatch ? sentenceMatch[0].trim() : html.trim();
            if (!sentence) return html;

            const wrapped = `<span class="smart-line" data-id="${escapeHtml(id)}" data-english="${escapeHtml(sentence)}">${sentence}</span>`;
            return html.replace(sentence, wrapped);
        }

        function bindSmartLines() {
            document.querySelectorAll('.smart-line').forEach(line => {
                line.addEventListener('click', function(event) {
                    event.stopPropagation();
                    document.querySelectorAll('.smart-line').forEach(item => item.classList.remove('active'));
                    this.classList.add('active');

                    const lineId = this.getAttribute('data-id');
                    const data = bookDatabase[lineId];

                    if (data) {
                        const visibleEnglish = this.getAttribute('data-english') || this.innerText || data.english || '';
                        decEnglish.innerText = '"' + visibleEnglish + '"';
                        decUrdu.innerText = data.urdu || 'Is concept ki explanation JSON mein available nahi.';
                        if (data.example) {
                            decExample.innerText = data.example;
                            decExampleBox.style.display = 'block';
                        } else {
                            decExample.innerText = '';
                            decExampleBox.style.display = 'none';
                        }
                        decContent.style.display = 'block';
                        drawer.classList.add('open');
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

        function showLoadError(error) {
            spreadContainer.innerHTML = `
                <div class="load-message">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <strong>Secure Data Sync Failed</strong>
                    <span>API server se data fetch nahi ho saka. Connection check karein.</span>
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

        document.addEventListener('click', function(event) {
            if (!drawer.contains(event.target) && drawer.classList.contains('open')) {
                closeDrawer();
            }
        });
    
