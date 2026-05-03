const API_BASE = "https://api.quran.com/api/v4";
const TRANSLATION_IDS = "131,20"; 
const TAFSIR_ID = 169; // English Ibn Kathir

let divineData = []; 
let currentStation = 1;
let ayahDatabase = {}; 
const audio = document.getElementById('bgAudio');

// Language States
let isTransUrdu = false;
let isTafsirUrdu = false;
let currentVerseKey = null;
let currentTafsirEng = "";

async function initSystem() {
    initDayNightTheme();
    
    const daysList = document.getElementById('daysList');
    for(let i = 1; i <= 175; i++) {
        daysList.innerHTML += `
            <div onclick="loadStation(${i})" id="dayBtn-${i}" class="p-3.5 cursor-pointer rounded-xl flex items-center justify-between bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-gray-800/40 transition-all group border border-slate-100 dark:border-transparent active:scale-95">
                <div class="flex flex-col">
                    <span class="text-[9px] font-bold text-sky-600 dark:text-sky-500 tracking-wider uppercase">Station ${i}</span>
                    <p class="text-sm font-bold text-slate-700 dark:text-gray-400 group-hover:text-slate-950 dark:group-hover:text-white mt-0.5 sidebar-title transition-colors" id="sidebarParaTitle-${i}">Loading...</p>
                </div>
            </div>
        `;
    }

    try {
        const res = await fetch('features/assets/divine_blueprint.json');
        divineData = await res.json();
        divineData.forEach(item => {
            const titleEl = document.getElementById(`sidebarParaTitle-${item.day}`);
            if(titleEl) titleEl.innerText = item.para_name;
        });
    } catch(e) {
        console.error("⚠️ Error loading Divine Blueprint JSON:", e);
    }

    loadStation(1);
}

async function loadStation(dayNumber) {
    currentStation = dayNumber;
    ayahDatabase = {}; 
    
    if(window.innerWidth < 1024) document.getElementById('sidebar').classList.remove('open');
    document.querySelectorAll('[id^="dayBtn-"]').forEach(btn => btn.classList.remove('active-day'));
    document.getElementById(`dayBtn-${dayNumber}`).classList.add('active-day');
    document.getElementById('contentArea').scrollTo({ top: 0, behavior: 'smooth' });
    closeDrawer(); 

    const { startPage, endPage } = getPagesForDay(dayNumber);
    
    document.getElementById('topDayLabel').innerText = `Station ${dayNumber}`;
    document.getElementById('mainTitle').innerText = `Station ${dayNumber}`;
    document.getElementById('pageNumbers').innerHTML = `<i class="fas fa-book-open text-sky-500 dark:text-sky-400"></i> Pages ${startPage} to ${endPage}`;

    document.getElementById('quranPageContainer').innerHTML = `<div class="text-center py-16 text-slate-400"><i class="fas fa-circle-notch fa-spin text-3xl text-sky-500 mb-4"></i><p class="text-sm font-medium font-sans mt-3">Opening the Pages...</p></div>`;
    document.getElementById('niyatContainer').style.display = 'none';

    const dayJsonData = divineData.find(d => d.day === dayNumber);
    if(dayJsonData) {
        document.getElementById('topParaInfo').innerText = `${dayJsonData.para_name} (Para ${dayJsonData.para_number})`;
        setTimeout(() => renderBlueprintCards(dayJsonData.rukus[0]), 150);
    }

    let allVerses = [];
    try {
        for (let p = startPage; p <= endPage; p++) {
            console.log("Fetching Quran Page: ", p); // 🔥 Helps you see API working in console
            const url = `${API_BASE}/verses/by_page/${p}?language=en&words=true&word_fields=text_indopak,translation&translations=${TRANSLATION_IDS}&fields=text_indopak`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("API Limit");
            const data = await res.json();
            if(data.verses) allVerses = allVerses.concat(data.verses);
        }
        if (allVerses.length === 0) throw new Error("Empty");
        renderVerses(allVerses);
    } catch (err) {
        document.getElementById('quranPageContainer').innerHTML = `<div class="text-center py-12 text-red-500 font-sans"><i class="fas fa-wifi text-3xl mb-3"></i><p class="text-sm font-medium">Connection Interrupted.</p></div>`;
    }
}

function getPagesForDay(day) {
    const pagesPerDay = 604 / 175;
    let startPage = Math.floor((day - 1) * pagesPerDay) + 1;
    let endPage = Math.floor(day * pagesPerDay);
    if (day == 175) endPage = 604; 
    if (startPage > endPage) endPage = startPage;
    return { startPage, endPage };
}

// --- 4. RENDER QURAN ---
function renderVerses(verses) {
    let bookHTML = '';
    let currentChapter = null;

    verses.forEach((verse) => {
        const verseKey = verse.verse_key;
        const [chapterId, verseNum] = verseKey.split(':');
        
        if (verseNum === '1') {
            if (chapterId !== '1' && chapterId !== '9') {
                bookHTML += `
                    <div class="bismillah-block w-full block mt-10 mb-8 font-arabic" dir="rtl">
                        <span class="bismillah-word text-sky-600 dark:text-sky-400">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
                    </div>
                `;
            } else if (chapterId === '9') {
                bookHTML += `<div class="w-full block mt-8 mb-6"></div>`; 
            }
        }

        let translationText = "";
        if (verse.translations && verse.translations.length > 0) translationText = verse.translations[0].text;
        else if (verse.words) translationText = verse.words.map(w => w.translation?.text || "").join(" ").replace(/null/g, '').trim();
        translationText = translationText.replace(/<sup.*?<\/sup>/g, '');

        ayahDatabase[verseKey] = { trans: translationText };

        let wordsHTML = '';
        if(verse.words) {
            verse.words.forEach(word => {
                if (word.char_type_name !== 'end') {
                    const wordTranslation = word.translation?.text || "";
                    const wordText = word.text_indopak || word.text_uthmani; 
                    
                    wordsHTML += `
                        <span class="word-group">
                            <div class="tooltip-box">
                                ${wordTranslation}
                                <div class="tooltip-arrow"></div>
                            </div>
                            <span class="arabic-word drop-shadow-sm dark:drop-shadow-none">${wordText}</span>
                        </span>`;
                }
            });
        }

        bookHTML += `
            <span class="smart-line group" onclick="openDrawer('${verseKey}', this)">
                ${wordsHTML}
            </span> 
            <span class="ayah-end select-none">۝</span> `;
    });

    document.getElementById('quranPageContainer').innerHTML = bookHTML;
}

// --- 🌟 SMART DRAWER LOGIC ---
async function openDrawer(verseKey, element) {
    currentVerseKey = verseKey;
    
    // Reset Toggles to English on open
    isTransUrdu = false;
    isTafsirUrdu = false;
    const btnTrans = document.getElementById('btnTransToggle');
    btnTrans.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-indigo-200 dark:border-indigo-500/50 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-95";
    btnTrans.innerText = "URDU";
    
    const btnTafsir = document.getElementById('btnTafsirToggle');
    btnTafsir.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-sky-200 dark:border-sky-500/50 text-sky-500 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all active:scale-95";
    btnTafsir.innerText = "URDU";

    document.querySelectorAll('.smart-line').forEach(l => l.classList.remove('active'));
    if(element) element.classList.add('active');

    const drawer = document.getElementById('magic-drawer');
    document.getElementById('dec-init').style.display = 'none';
    document.getElementById('dec-content').style.display = 'block';

    document.getElementById('dec-trans').innerHTML = ayahDatabase[verseKey].trans; // English Translation Default
    
    const tafsirBox = document.getElementById('dec-tafsir');
    tafsirBox.innerHTML = '<div class="text-center py-8 text-sky-500"><i class="fas fa-circle-notch fa-spin text-3xl mb-3"></i><p class="font-sans text-xs font-bold tracking-widest uppercase">Fetching Accurate Tafsir...</p></div>';
    
    drawer.classList.add('open');

    try {
        // Fetch Default English Tafsir
        const res = await fetch(`${API_BASE}/tafsirs/${TAFSIR_ID}/by_ayah/${verseKey}`);
        const data = await res.json();
        if (data && data.tafsir) {
            currentTafsirEng = data.tafsir.text;
            tafsirBox.innerHTML = currentTafsirEng; // Injected without Urdu class
        } else {
            currentTafsirEng = "Tafsir currently unavailable for this specific verse.";
            tafsirBox.innerHTML = currentTafsirEng;
        }
    } catch (e) {
        currentTafsirEng = "<span class='text-red-500'>Network error. Failed to load Tafsir.</span>";
        tafsirBox.innerHTML = currentTafsirEng;
    }
}

// --- 🌍 LANGUAGE TOGGLE LOGIC ---
async function toggleTrans() {
    const btn = document.getElementById('btnTransToggle');
    const box = document.getElementById('dec-trans');
    isTransUrdu = !isTransUrdu;
    
    if (isTransUrdu) {
        btn.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-indigo-500 bg-indigo-500 text-white shadow-md transition-all active:scale-95";
        btn.innerText = "ENGLISH";
        box.innerHTML = '<div class="text-center text-indigo-400 py-2"><i class="fas fa-circle-notch fa-spin"></i> Fetching Urdu...</div>';
        
        try {
            const res = await fetch(`${API_BASE}/verses/by_key/${currentVerseKey}?language=ur&translations=97`);
            const data = await res.json();
            const urduText = data.verse.translations[0].text.replace(/<sup.*?<\/sup>/g, '');
            
            // Added leading-[2.6] for perfect spacing
            box.innerHTML = `<div dir="rtl" class="font-urdu text-[15px] md:text-[16px] leading-[2.6] text-right text-slate-800 dark:text-gray-200">${urduText}</div>`;
        } catch(e) {
            box.innerHTML = "Urdu Translation unavailable.";
        }
    } else {
        btn.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-indigo-200 dark:border-indigo-500/50 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-95";
        btn.innerText = "URDU";
        box.innerHTML = ayahDatabase[currentVerseKey].trans;
    }
}

async function toggleTafsirLang() {
    const btn = document.getElementById('btnTafsirToggle');
    const box = document.getElementById('dec-tafsir');
    isTafsirUrdu = !isTafsirUrdu;
    
    if (isTafsirUrdu) {
        btn.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-sky-500 bg-sky-500 text-white shadow-md transition-all active:scale-95";
        btn.innerText = "ENGLISH";
        box.innerHTML = '<div class="text-center text-sky-400 py-4"><i class="fas fa-circle-notch fa-spin"></i> Fetching Urdu Tafsir...</div>';
        
        try {
            const res = await fetch(`${API_BASE}/tafsirs/160/by_ayah/${currentVerseKey}`); 
            const data = await res.json();
            if(data && data.tafsir) {
                const urduTafsirText = data.tafsir.text;
                // Put inside urdu-tafsir-container so CSS forces clean font & spacing (2.6)
                box.innerHTML = `<div dir="rtl" class="urdu-tafsir-container text-slate-800 dark:text-gray-200">${urduTafsirText}</div>`;
            } else {
                box.innerHTML = "<div class='text-center py-4'>Urdu Tafsir not available for this verse in API.</div>";
            }
        } catch(e) {
            box.innerHTML = "Error fetching Urdu Tafsir.";
        }
    } else {
        btn.className = "text-[10px] font-bold uppercase px-4 py-1.5 rounded-md border border-sky-200 dark:border-sky-500/50 text-sky-500 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500/10 transition-all active:scale-95";
        btn.innerText = "URDU";
        // Restores English default, untainted by Urdu CSS
        box.innerHTML = currentTafsirEng;
    }
}

function closeDrawer() {
    const drawer = document.getElementById('magic-drawer');
    drawer.classList.remove('open');
    document.querySelectorAll('.smart-line').forEach(l => l.classList.remove('active'));
    setTimeout(() => {
        document.getElementById('dec-content').style.display = 'none';
        document.getElementById('dec-init').style.display = 'block';
    }, 400);
}

document.addEventListener('click', function(e) {
    const drawer = document.getElementById('magic-drawer');
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !e.target.closest('.smart-line') && !e.target.closest('button')) {
        closeDrawer();
    }
});

// 💎 RENDER BLUEPRINT CARDS (UNTOUCHED) 💎
function renderBlueprintCards(rukuData) {
    const container = document.getElementById('blueprintContainer');
    const pStyle = "relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full text-slate-700 dark:text-gray-300 font-medium";
    const qPoints = rukuData.quranic_depth.map(p => `<p class="${pStyle} before:bg-sky-400">${p}</p>`).join('');
    const cPoints = rukuData.corporate_reality.map(p => `<p class="${pStyle} before:bg-emerald-400">${p}</p>`).join('');
    const sPoints = rukuData.science_lens.map(p => `<p class="${pStyle} before:bg-indigo-400">${p}</p>`).join('');

    container.innerHTML = `
        <div class="glass-card p-8 fade-in-up" style="animation-delay: 0.1s;">
            <div class="w-14 h-14 bg-sky-50 dark:bg-sky-900/20 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 mb-8 border border-sky-100 dark:border-sky-500/20"><i class="fa-solid fa-book-quran fa-xl"></i></div>
            <h3 class="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">Quranic Depth</h3>
            <div class="text-[14px] leading-relaxed space-y-4">${qPoints}</div>
        </div>
        <div class="glass-card p-8 fade-in-up" style="animation-delay: 0.2s;">
            <div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 border border-emerald-100 dark:border-emerald-500/20"><i class="fa-solid fa-briefcase fa-xl"></i></div>
            <h3 class="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">Corporate Reality</h3>
            <div class="text-[14px] leading-relaxed space-y-4">${cPoints}</div>
        </div>
        <div class="glass-card p-8 fade-in-up" style="animation-delay: 0.3s;">
            <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 border border-indigo-100 dark:border-indigo-500/20"><i class="fa-solid fa-atom fa-xl"></i></div>
            <h3 class="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">Science Lens</h3>
            <div class="text-[14px] leading-relaxed space-y-4">${sPoints}</div>
        </div>
    `;
    document.getElementById('actionNiyat').innerText = `"${rukuData.action_niyat}"`;
    document.getElementById('niyatContainer').style.display = 'block';
}

function initDayNightTheme() {
    if (new Date().getHours() >= 18 || new Date().getHours() < 6) document.documentElement.classList.add('dark');
    audio.src = 'features/assets/night.mp3'; audio.load();
}

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if(audio.paused) {
        audio.volume = 0; audio.play();
        let v = 0; const f = setInterval(() => { v+=0.01; audio.volume=v; if(v>=0.15) clearInterval(f); }, 50);
        btn.classList.add('nasheed-pulse');
    } else {
        let v = audio.volume; const f = setInterval(() => { v-=0.01; audio.volume=v; if(v<=0) {audio.pause(); clearInterval(f);} }, 50);
        btn.classList.remove('nasheed-pulse');
    }
}

function toggleSidebar() { 
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open'); 
    
    // App-like background blur when menu opens
    let overlay = document.getElementById('mobile-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mobile-overlay';
        overlay.onclick = toggleSidebar; // Click on blur to close menu
        document.body.appendChild(overlay);
    }
    
    if (sidebar.classList.contains('open')) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}
document.getElementById('searchDay').addEventListener('input', (e) => {
    const t = e.target.value.toLowerCase();
    document.querySelectorAll('[id^="dayBtn-"]').forEach(el => el.style.display = el.innerText.toLowerCase().includes(t) ? "flex" : "none");
});

// 🔥 SECURITY SHIELD 🔥
document.addEventListener('contextmenu', e => e.preventDefault()); 
document.onkeydown = e => {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode==73 || e.keyCode==74)) || (e.ctrlKey && e.keyCode==85) || (e.ctrlKey && e.keyCode==67)) return false;
}

window.onload = initSystem;
