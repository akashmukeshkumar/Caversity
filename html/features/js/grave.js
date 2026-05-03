const video = document.getElementById('graveVideo');
const uiLayer = document.getElementById('uiLayer');
const qText = document.getElementById('questionText');
const btnCorrect = document.getElementById('btnCorrect');
const btnWrong = document.getElementById('btnWrong');
const timerBar = document.getElementById('timerBar');
const bloodFlash = document.getElementById('bloodFlash');
const jannahGlow = document.getElementById('jannahGlow');
const finalTextLayer = document.getElementById('finalTextLayer');
const outcomeTitle = document.getElementById('outcomeTitle');
const finalHadith = document.getElementById('finalHadith');

const introScreen = document.getElementById('introScreen');
const nameInput = document.getElementById('userName');

// =========================================================================
// 🎯 EXACT TIMELINE ENGINE (Your Timestamps)
// =========================================================================
const questions = [
    { time: 50.61, text: "WHO IS YOUR LORD?", correct: "Allah", wrong: "I don't know" },
    { time: 54.10, text: "WHAT IS YOUR RELIGION?", correct: "Islam", wrong: "I don't know" },
    { time: 58.69, text: "WHO IS YOUR PROPHET?", correct: "Muhammad (PBUH)", wrong: "I don't know" },
    { time: 63.78, text: "WHICH BOOK DO YOU BELIEVE IN?", correct: "The Quran", wrong: "I don't know" },
    { time: 71.27, text: "WHERE IS THE QIBLA?", correct: "The Kaaba", wrong: "I don't know" },
    { time: 76.92, text: "WHAT DO YOU KNOW ABOUT MUHAMMAD (PBUH)?", correct: "He is the Messenger of Allah", wrong: "I don't know" }
];

// Scene Boundaries
const AZAAB_START = 92.15; 
const AZAAB_END = 94.54;   
const JANNAH_START = 94.55; 
const JANNAH_END = 104.59;  

// System States
let currentQIndex = 0;
let isQuestionActive = false;
let timerInterval;
let hasFailed = false;
let hasPassedAll = false;
let globalUserName = "";
let azaabStartTime = 0;

// =========================================================================

function startJourney() {
    // STRICT NAME VALIDATION
    const enteredName = nameInput.value.trim();
    if (!enteredName) {
        nameInput.classList.remove('input-error');
        void nameInput.offsetWidth; 
        nameInput.classList.add('input-error');
        nameInput.placeholder = "ENTER YOUR NAME TO PROCEED";
        return; 
    }

    globalUserName = enteredName;
    
    // Force Fullscreen for Realism
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(e => {});
    
    if(navigator.vibrate) navigator.vibrate([100, 100, 100, 100]);

    // 🔥 Fade out Intro, Fade in Video smoothly 🔥
    introScreen.style.opacity = '0';
    
    setTimeout(() => { 
        introScreen.style.display = 'none'; 
        video.style.opacity = '1'; // Make video visible now!
        video.play(); 
    }, 1500); // 1.5 seconds wait for smooth transition

    requestAnimationFrame(trackVideoTime);
}

// ⏱️ High-Precision Engine
function trackVideoTime() {
    let t = video.currentTime;

    if (currentQIndex < questions.length && !isQuestionActive && !hasFailed) {
        let q = questions[currentQIndex];
        if (t >= q.time && t < q.time + 0.3) {
            triggerQuestion(q);
        }
    }

    if (hasPassedAll) {
        if (t >= 92.00 && t < JANNAH_START) {
            video.currentTime = JANNAH_START;
            jannahGlow.classList.add('jannah-active');
        }
        if (t >= JANNAH_END) {
            video.pause();
            showFinalResult(true);
            return; 
        }
    }

    if (hasFailed) {
        if (t >= AZAAB_END) {
            // Loop Squeeze scene for ~7.5 seconds
            if (Date.now() - azaabStartTime < 7500) {
                video.currentTime = AZAAB_START; 
            } else {
                video.pause();
                document.body.classList.remove('shake-active'); 
                showFinalResult(false);
                return; 
            }
        }
    }

    requestAnimationFrame(trackVideoTime);
}

function triggerQuestion(qData) {
    isQuestionActive = true;
    video.pause(); 
    
    qText.innerText = qData.text;
    btnCorrect.innerText = qData.correct;
    btnWrong.innerText = qData.wrong;
    uiLayer.classList.add('ui-visible');

    let timeLeft = 100;
    timerBar.style.width = '100%';
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft -= 1.4; 
        timerBar.style.width = timeLeft + '%';
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            answer(false); 
        }
    }, 100);
}

function answer(isCorrect) {
    clearInterval(timerInterval);
    uiLayer.classList.remove('ui-visible');
    
    setTimeout(() => {
        isQuestionActive = false;

        if (isCorrect) {
            currentQIndex++;
            if (currentQIndex >= questions.length) hasPassedAll = true;
            video.play();
        } else {
            triggerAzaab();
        }
    }, 400); 
}

function triggerAzaab() {
    hasFailed = true;
    azaabStartTime = Date.now(); 
    
    video.currentTime = AZAAB_START; 
    video.play();

    if (navigator.vibrate) navigator.vibrate([1000, 500, 1000, 500, 2000]);
    document.body.classList.add('shake-active');
    bloodFlash.classList.add('blood-active');
}

function showFinalResult(isSuccess) {
    finalTextLayer.style.opacity = '1';
    finalTextLayer.style.pointerEvents = 'auto';

    if (isSuccess) {
        outcomeTitle.style.color = '#34d399'; 
        outcomeTitle.innerText = "A Beautiful Return";
        finalHadith.innerHTML = `
            <span style="color:#a7f3d0; font-size:1.3rem;">"O ${globalUserName}... My servant has spoken the truth."</span><br><br>
            <span style="font-family:'Inter', sans-serif; font-size:1rem; font-weight:300; opacity:0.9;">
            A voice calls out from the heavens: "Furnish his grave from Paradise, clothe him from Paradise, and open for him a door to Paradise."<br><br>
            The grave expands as far as the eye can see, filled with the scent of Jannah. Your good deeds take the form of a beautiful companion, whispering: "Rejoice, for this is the day you were promised."
            </span>
        `;
    } else {
        outcomeTitle.style.color = '#ef4444'; 
        outcomeTitle.innerText = "The Inescapable Reality";
        finalHadith.innerHTML = `
            <span style="color:#fca5a5; font-size:1.3rem;">"O ${globalUserName}... you chose the world over Me."</span><br><br>
            <span style="font-family:'Inter', sans-serif; font-size:1rem; font-weight:300; opacity:0.9;">
            The earth is ordered to squeeze you until your ribs interlock. A door to Hellfire is opened, and its scorching heat and poisonous wind engulf you.<br><br>
            Your ignored prayers, your lies, and your sins take the form of a terrifying, foul-smelling creature that says: "I am your wicked deeds. This is the reality you forgot while chasing the illusion."
            </span>
        `;
    }

    // Text aur Button ko ek ke baad ek show karo
    setTimeout(() => { 
        finalHadith.classList.add('reveal-text'); 
        
        // Text aane ke 3 second baad Netflix button aahista se pop hoga
        setTimeout(() => {
            document.getElementById('exitBtn').classList.add('show');
        }, 3000);
        
    }, 1000);
}

document.addEventListener('contextmenu', e => e.preventDefault()); 