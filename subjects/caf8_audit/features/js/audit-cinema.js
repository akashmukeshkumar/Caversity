        // --- 1. CONFIGURATION (Dynamic Year + Desc) ---
        const ACU_DATA = [
            {
                id: "movie_1",
                title: "The Gatekeeper",
                year: "2023", // 🔥 Dynamic Year
                tag: "Phase 1: Foundation",
                desc: "Mastering the Code of Ethics, Laws, and Acceptance Procedures.",
                img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=100&w=800&auto=format&fit=crop", 
                books: [
                    { title: "S1: Ethics", folder: "season_1", chapters: 20 },
                    { title: "S2: Law", folder: "season_2", chapters: 15 },
                    { title: "S3: ISA 210", folder: "season_3", chapters: 10 },
                    { title: "S4: ISA 230", folder: "season_4", chapters: 10 },
                    { title: "S5: Quality", folder: "season_5", chapters: 8 }
                ]
            },
            {
                id: "movie_2",
                title: "The Blueprint",
                year: "2024",
                tag: "Phase 2: Strategy",
                desc: "Identifying Risks, Planning the Audit Strategy, and Materiality.",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S6: Risk", folder: "season_1", chapters: 20 },
                    { title: "S7: Strategy", folder: "season_2", chapters: 10 },
                    { title: "S8: Materiality", folder: "season_3", chapters: 12 },
                    { title: "S9: Controls", folder: "season_4", chapters: 25 },
                    { title: "S10: IT Audit", folder: "season_5", chapters: 15 }
                ]
            },
            {
                id: "movie_3",
                title: "The Investigation",
                year: "2025",
                tag: "Phase 3: Fieldwork",
                desc: "Collecting Evidence, Sampling, and Detecting Fraud in Financials.",
                img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S11: Substantive", folder: "season_1", chapters: 30 },
                    { title: "S12: Fraud", folder: "season_2", chapters: 20 },
                    { title: "S13: Sampling", folder: "season_3", chapters: 15 },
                    { title: "S14: Related", folder: "season_4", chapters: 15 },
                    { title: "S15: Confirmed", folder: "season_5", chapters: 12 },
                    { title: "S16: IA", folder: "season_6", chapters: 10 },
                    { title: "S17: Expert", folder: "season_7", chapters: 8 }
                ]
            },
            {
                id: "movie_4",
                title: "The Verdict",
                year: "2026",
                tag: "Phase 4: Reporting",
                desc: "Reviewing Subsequent Events and Signing the Final Auditor's Report.",
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=100&w=800&auto=format&fit=crop",
                books: [
                    { title: "S18: Subsequent", folder: "season_1", chapters: 15 },
                    { title: "S19: Reps", folder: "season_2", chapters: 10 },
                    { title: "S20: Report", folder: "season_3", chapters: 25 },
                    { title: "S21: Review", folder: "season_4", chapters: 10 }
                ]
            }
        ];

        const bgMusic = new Audio('Caversity/subjects/caf8_audit/features/assets/fire.mp3');
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

        window.onload = function() { renderPhases(); };

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
                
                const thumbPath = `Caversity/subjects/caf8_audit/features/assets/acu_database/${ACU_DATA[currentPhaseIdx].id}/${book.folder}/ep_${i}/1.png`;
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
            const testPath = `Caversity/subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${chapNum}/1.png`;

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
            const currentImgSrc = `Caversity/subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${currentChap}/${currentPage}.png`;

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
            nextImg.src = `Caversity/subjects/caf8_audit/features/assets/acu_database/${phaseFolder}/${bookFolder}/ep_${currentChap}/${nextPage}.png`;
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

        // 🔥 UNIVERSAL SHIELD: DISABLE INSPECT, COPY & RIGHT CLICK 🔥
        document.addEventListener('contextmenu', event => event.preventDefault()); // Right Click Block

        document.onkeydown = function(e) {
            if(e.keyCode == 123) { return false; } // F12 Block
            if(e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) { return false; }
            if(e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'S'.charCodeAt(0))) { return false; } // View Source & Save Block
        };

        // Text Selection Disable
        document.addEventListener("DOMContentLoaded", () => {
            document.body.style.userSelect = "none";
            document.body.style.webkitUserSelect = "none";
        });