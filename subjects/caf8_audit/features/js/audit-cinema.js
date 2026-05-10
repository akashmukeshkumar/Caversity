        let ACU_DATA = [];

        const bgMusic = new Audio('subjects/caf8_audit/features/assets/fire.mp3');
        bgMusic.loop = true; bgMusic.volume = 0.5;

        let currentPhaseIdx = 0;
        let currentBookIdx = 0;
        let currentChap = 1;
        let currentPage = 1;

        // Background Rotator
        let bgIndex = 0;
        const bgs = document.querySelectorAll('.hero-bg');
        setInterval(() => {
            bgs[bgIndex].classList.remove('active');
            bgIndex = (bgIndex + 1) % bgs.length;
            bgs[bgIndex].classList.add('active');
        }, 6000);

        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if(window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        window.onload = async function() { 
            try {
                const res = await fetch('/api/audit-cinema', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'get_acu_data' })
                });
                if (!res.ok) throw new Error("API Limit");
                ACU_DATA = await res.json();
                renderPhases(); 
            } catch (e) { console.error("Data secure restricted."); }
        };

        function renderPhases() {
            const container = document.getElementById('phase-list');
            container.innerHTML = "";
            ACU_DATA.forEach((phase, idx) => {
                const card = document.createElement('div');
                card.className = "phase-card";
                card.innerHTML = `<img src="${phase.img}">`;
                card.onclick = () => openPhase(idx);
                container.appendChild(card);
            });
        }

        function openPhase(idx) {
            currentPhaseIdx = idx;
            const phase = ACU_DATA[idx];
            
            document.getElementById('content-panel').style.display = 'block';
            document.getElementById('active-phase-title').innerText = phase.title;
            document.getElementById('active-phase-tag').innerText = phase.tag;
            
            // 🔥 Dynamic Header Updates
            document.getElementById('main-hero-title').innerText = phase.title;
            document.getElementById('main-hero-desc').innerText = phase.desc;
            document.getElementById('hero-year').innerText = phase.year;
            document.getElementById('hero-seasons').innerText = phase.books.length + " Seasons";

            const tabContainer = document.getElementById('books-list');
            tabContainer.innerHTML = "";
            phase.books.forEach((book, bIdx) => {
                const btn = document.createElement('button');
                btn.className = `book-tab ${bIdx===0 ? 'active' : ''}`;
                btn.innerText = book.title;
                btn.onclick = (e) => {
                    document.querySelectorAll('.book-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    renderChapters(bIdx);
                };
                tabContainer.appendChild(btn);
            });
            renderChapters(0);
            scrollToPanel();
        }

        function renderChapters(bIdx) {
            currentBookIdx = bIdx;
            const book = ACU_DATA[currentPhaseIdx].books[bIdx];
            const list = document.getElementById('chapters-list');
            list.innerHTML = "";

            for(let i=1; i<=book.chapters; i++) {
                const row = document.createElement('div');
                row.className = "chapter-row";
                
                const thumbPath = `subjects/caf8_audit/features/assets/acu_database/${ACU_DATA[currentPhaseIdx].id}/${book.folder}/ep_${i}/1.png`;
                const fallbackThumb = `https://via.placeholder.com/180x100/000000/FFFFFF/?text=EP${i}`;

                row.innerHTML = `
                    <div class="chap-num">${i}</div>
                    <div class="chap-img">
                        <img src="${thumbPath}" onerror="this.src='${fallbackThumb}'">
                    </div>
                    <div class="chap-info">
                        <div class="chap-title">Episode ${i}</div>
                        <div class="chap-desc">${ACU_DATA[currentPhaseIdx].desc} (Part ${i})</div>
                    </div>
                    <div class="play-indicator">
                         <i class="fas fa-play"></i> Read Now
                    </div>
                `;
                row.onclick = () => checkAndPlay(i);
                list.appendChild(row);
            }
        }

        function checkAndPlay(chapNum) {
            const phaseFolder = ACU_DATA[currentPhaseIdx].id;
            const bookFolder = ACU_DATA[currentPhaseIdx].books[currentBookIdx].folder;
            const testPath = `subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${chapNum}/1.png`;

            const testImg = new Image();
            testImg.onload = function() { launchReader(chapNum); };
            testImg.onerror = function() { showToast("🚧 Production In Progress: Coming Soon"); };
            testImg.src = testPath;
        }

        // --- READER ---
        function launchReader(chapNum) {
            currentChap = chapNum;
            currentPage = 1;
            const elem = document.documentElement;
            if (elem.requestFullscreen) { elem.requestFullscreen(); }
            
            // 🔥 Prevent Body Scroll
            document.body.classList.add('reading-mode');

            bgMusic.play().catch(e => {});
            document.getElementById('reader-mode').style.display = 'flex';
            loadImage();

            // Reader khulne par message dikhao aur 3 second baad gayab kar do
document.getElementById('rotate-hint').style.display = (window.innerWidth < 768) ? 'block' : 'none';
setTimeout(() => { document.getElementById('rotate-hint').style.display = 'none'; }, 3000);
        }

        function exitReader() {
            document.getElementById('reader-mode').style.display = 'none';
            
            // 🔥 Allow Body Scroll
            document.body.classList.remove('reading-mode');

            bgMusic.pause(); bgMusic.currentTime = 0;
            if (document.exitFullscreen) { document.exitFullscreen(); }
        }

        function loadImage() {
            const img = document.getElementById('reader-image');
            img.classList.remove('loaded'); 
            
            const phaseFolder = ACU_DATA[currentPhaseIdx].id;
            const bookFolder = ACU_DATA[currentPhaseIdx].books[currentBookIdx].folder;
            const currentImgSrc = `subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${currentChap}/${currentPage}.png`;

            // 🔥 Delay ko 100ms se 50ms kar diya taake fauran change ho
            setTimeout(() => {
                img.src = currentImgSrc;
                img.onload = () => { 
                    img.classList.add('loaded'); 
                    
                    if(isAudioPlaying) {
                        playPageAudio();
                    }

                    // 🔥 JADOO: Agla page chupke se background mein load kar lo!
                    preloadNextImage(phaseFolder, bookFolder);
                };
            }, 50);
        }

        // 🔥 NAYA FUNCTION: Preloading Logic
        function preloadNextImage(phaseFolder, bookFolder) {
            const nextImg = new Image();
            const nextPage = currentPage + 1;
            nextImg.src = `subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${currentChap}/${nextPage}.png`;
        }

        function changePage(dir) {
            if(dir === 1) currentPage++;
            else if(currentPage > 1) currentPage--;
            loadImage();
        }

        function handleReadError() {
    // Check karo ke kya Reader waqai screen par khula hua hai?
    const readerMode = document.getElementById('reader-mode');
    
    // Agar reader band hai, to error ignore kar do (No Toast)
    if (!readerMode || readerMode.style.display !== 'flex') {
        return; 
    }

    // Agar reader khula hai aur error aaya:
    if (currentPage > 1) {
        showToast("✅ Episode Finished");
        exitReader();
    } else {
        showToast("Error: Image File Missing");
        exitReader();
    }
}

        function scrollToPanel() {
            document.getElementById('content-panel').style.display = 'block';
            document.getElementById('content-panel').scrollIntoView({ behavior: 'smooth' });
        }

        function showToast(msg) {
            const x = document.getElementById("toast");
            x.innerText = msg;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }

        document.addEventListener('keydown', (e) => {
            if(document.getElementById('reader-mode').style.display === 'flex') {
                if(e.key === "ArrowRight") changePage(1);
                if(e.key === "ArrowLeft") changePage(-1);
                if(e.key === "Escape") exitReader();
            }
        });

        document.addEventListener('contextmenu', e => e.preventDefault());

        document.onkeydown = function(x) {
            if(x.keyCode === 123) return false;
            if(x.ctrlKey && x.shiftKey && [73, 74, 67].includes(x.keyCode)) return false;
            if(x.ctrlKey && [85, 83].includes(x.keyCode)) return false;
        };

        document.addEventListener("DOMContentLoaded", () => {
            document.body.style.userSelect = "none";
            document.body.style.webkitUserSelect = "none";
        });
