import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeIvzRYa7G2f0iqfpgmRaaRRoDDb-OBZ8",
    authDomain: "caversity-48b29.firebaseapp.com",
    projectId: "caversity-48b29",
    storageBucket: "caversity-48b29.firebasestorage.app",
    messagingSenderId: "836067330285",
    appId: "1:836067330285:web:b20c125a385f7a2107e4e4",
    measurementId: "G-9QYDS8R9RJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const academicSubjects = [
    { id: 'caf1', name: 'CAF 1: Financial Accounting and Reporting I', description: 'Master the fundamentals of financial accounting principles and reporting standards.', price: 200, type: 'premium', url: 'subjects/caf1/index.html' },
    { id: 'caf2', name: 'CAF 2: Tax Practices', description: 'Comprehensive understanding of taxation principles and practices.', price: 200, type: 'premium', url: 'subjects/caf2/index.html' },
    { id: 'caf3', name: 'CAF 3: Cost and Management Accounting', description: 'Advanced cost analysis and management accounting techniques.', price: 200, type: 'premium', url: 'subjects/caf3/index.html' },
    { id: 'caf4', name: 'CAF 4: Business Law', description: 'Legal frameworks and principles governing business operations.', price: 200, type: 'premium', url: 'subjects/caf4/index.html' },
    { id: 'caf5', name: 'CAF 5: Financial Accounting and Reporting II', description: 'Advanced financial reporting and complex accounting scenarios.', price: 200, type: 'premium', url: 'subjects/caf5/index.html' },
    { id: 'caf6', name: 'CAF 6: Managerial and Financial Analysis', description: 'Strategic financial analysis and managerial decision-making tools.', price: 200, type: 'premium', url: 'subjects/caf6/index.html' },
    { id: 'caf7', name: 'CAF 7: Company Law', description: 'Corporate law principles and company governance structures.', price: 200, type: 'premium', url: 'subjects/caf7/index.html' },
    { id: 'caf8', name: 'CAF 8: Audit and Assurance', description: 'Audit methodologies and assurance services in professional practice.', price: 200, type: 'premium', url: 'audit.html' },
    { id: 'resume', name: 'CA Resume Builder', description: 'Craft a standout, ATS-friendly resume tailored specifically for CA & ACCA students.', price: 0, type: 'free', url: 'resume.html' },
    { id: 'sanctuary', name: 'The Sanctuary', description: 'Spiritual guidance and ethical foundations for professional excellence.', price: 0, type: 'free', url: 'blueprint.html' }
];

let currentUserProfile = { name: "Loading...", subscriptions: [] };
let currentSubjectContext = null;
let isMultiSubjectMode = false;
let appliedCouponDiscount = 0;
let appliedCouponCode = '';

const mockFirebaseCoupons = { 'DISCOUNT50': 50, 'CAVERSITY100': 100, 'OFF200': 200 };

// 🔥 THE BRAIN: Security, Expiry Dates & Database Link
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.replace("login.html");
        return;
    }

    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // 🔒 SECURITY LOGIC: DEVICE LOCK CHECK
            const localToken = localStorage.getItem('caversity_device_token');
            if (userData.deviceToken !== localToken) {
                await signOut(auth);
                alert("⚠️ Access Denied!\nYour account was logged in from another device. For security, you have been automatically logged out here.");
                window.location.replace("login.html");
                return;
            }

            // 📅 1-MONTH EXPIRY DATE LOGIC
            const today = new Date();
            const dbSubs = userData.subscriptions || {};
            const activeSubs = [];

            for (let subId in dbSubs) {
                const expiryDateString = dbSubs[subId];
                // Check agar value true ya koi purani false toh nahi hai
                if (expiryDateString && expiryDateString !== false) {
                    const expiryDate = new Date(expiryDateString);
                    if (expiryDate > today) {
                        activeSubs.push(subId); // Date abhi pass nahi hui, access de do!
                    }
                }
            }

            currentUserProfile = { name: userData.name, subscriptions: activeSubs };
            
            // Update Name in UI
            const welcomeMsg = document.getElementById('welcome-message');
            if(welcomeMsg) welcomeMsg.innerText = `Welcome back, ${userData.name.split(' ')[0]}`;
            
            renderSubjectCards();
            renderReviews();
        } else {
            console.log("No user database record found!");
        }
    } catch (e) { console.error("Error fetching user data:", e); }
});

function renderSubjectCards() {
    const grid = document.getElementById('subjects-grid');
    if(!grid) return;
    grid.innerHTML = '';

    academicSubjects.forEach(subject => {
        const isSubscribed = currentUserProfile.subscriptions.includes(subject.id);
        const card = document.createElement('div');
        card.className = `subject-card ${subject.type}-card`;

        let buttonText = 'Subscribe to Get Access';
        let buttonClass = 'premium-action';

        if (subject.type === 'premium') {
            if (isSubscribed) {
                card.classList.add('subscribed-card');
                buttonText = 'Open Subject';
                buttonClass = 'subscribed-action';
            }
        } else {
            buttonText = 'Access for Free';
            buttonClass = 'free-action';
        }

        let actionsHtml = `<button class="subject-action ${buttonClass}" data-id="${subject.id}">${buttonText}</button>`;
        
        // Add small share button next to free subjects
        if (subject.type === 'free') {
            let shareType = subject.id === 'resume' ? 'cv' : (subject.id === 'sanctuary' ? 'qarcs' : '');
            if (shareType) {
                actionsHtml = `
                <div style="display: flex; gap: 10px; width: 100%; margin-top: 1.5rem;">
                    <button class="subject-action ${buttonClass}" data-id="${subject.id}" style="margin-top: 0; flex: 1;">${buttonText}</button>
                    <button class="share-action-btn" onclick="triggerShare('${shareType}')" title="Share with friends">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
                `;
            }
        }

        card.innerHTML = `
            <h3 class="subject-title">${subject.name}</h3>
            <p class="subject-description">${subject.description}</p>
            ${actionsHtml}
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('subjects-grid');
    if(grid) {
        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.subject-action');
            if (!btn) return;
            
            const subjectId = btn.getAttribute('data-id');
            const subject = academicSubjects.find(s => s.id === subjectId);
            const isSubscribed = currentUserProfile.subscriptions.includes(subject.id);

            if (subject.type === 'premium' && !isSubscribed) {
                currentSubjectContext = subject;
                isMultiSubjectMode = false;
                openSubscriptionModal();
            } else {
                // Re-enforce security memory
                localStorage.setItem('caversity_user', JSON.stringify(currentUserProfile));
                window.location.href = subject.url || `subjects/${subject.id}/index.html`;
            }
        });
    }

    const signOutBtn = document.getElementById('sign-out-btn');
    if(signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to sign out?')) {
                await signOut(auth);
                window.location.replace('login.html');
            }
        });
    }

    const discountCardMain = document.getElementById('discount-card-main');
    if (discountCardMain) {
        discountCardMain.addEventListener('click', () => {
            currentSubjectContext = null;
            isMultiSubjectMode = true;
            openSubscriptionModal();
        });
    }

    document.getElementById('modal-close')?.addEventListener('click', () => {
        document.getElementById('subscription-modal').classList.remove('show');
    });

    document.getElementById('apply-coupon-btn')?.addEventListener('click', () => {
        const code = document.getElementById('coupon-code').value.trim().toUpperCase();
        const msg = document.getElementById('coupon-message');
        if (!code) {
            msg.textContent = 'Please enter a coupon code.';
            msg.className = 'coupon-message error';
            return;
        }
        if (mockFirebaseCoupons[code]) {
            appliedCouponDiscount = mockFirebaseCoupons[code];
            appliedCouponCode = code;
            msg.textContent = `Coupon applied successfully! (Rs. ${appliedCouponDiscount} off)`;
            msg.className = 'coupon-message success';
        } else {
            appliedCouponDiscount = 0;
            appliedCouponCode = '';
            msg.textContent = 'Invalid or expired coupon code.';
            msg.className = 'coupon-message error';
        }
        calculateTotal();
    });

    document.getElementById('subject-checkboxes')?.addEventListener('change', calculateTotal);

    document.getElementById('confirm-subscription')?.addEventListener('click', () => {
        const name = document.getElementById('student-name').value.trim();
        if (!name) return alert("Please enter your name.");

        let selected = [];
        const multiDisplay = document.getElementById('subject-checkboxes');
        if (isMultiSubjectMode) {
            const checked = multiDisplay.querySelectorAll('input:checked');
            checked.forEach(chk => selected.push(academicSubjects.find(s => s.id === chk.value).name));
            if(selected.length === 0) return alert("Select at least 1 subject to proceed.");
        } else {
            selected.push(currentSubjectContext.name);
        }

        const total = document.getElementById('total-amount').dataset.grand;
        const subtotal = document.getElementById('total-amount').dataset.subtotal;
        const discount = subtotal - total;
        
        // GENERATE WHATSAPP MESSAGE
        let msg = `Hello Caversity Team,\n\nI want to subscribe to:\nStudent: ${name}\n\n📚 Subjects:\n- ${selected.join('\n- ')}\n\n`;
        if (discount > 0) {
            msg += `💰 Payment Details:\nSubtotal: Rs. ${subtotal}\nDiscount: -Rs. ${discount}\nFinal Amount: Rs. ${total} / month\n\n`;
        } else {
            msg += `💰 Total: Rs. ${total} / month\n\n`;
        }
        msg += `📸 (I have attached my payment screenshot)`;
        
        window.open(`https://wa.me/923164156249?text=${encodeURIComponent(msg)}`, '_blank');
        document.getElementById('subscription-modal').classList.remove('show');
    });
});

function openSubscriptionModal() {
    const singleDisplay = document.getElementById('single-subject-display');
    const multiDisplay = document.getElementById('subject-checkboxes');
    const couponContainer = document.getElementById('coupon-container');
    
    document.getElementById('student-name').value = currentUserProfile.name !== "Loading..." ? currentUserProfile.name : "";
    document.getElementById('coupon-message').textContent = "";
    document.getElementById('coupon-code').value = "";
    appliedCouponDiscount = 0;
    appliedCouponCode = '';

    if (isMultiSubjectMode) {
        singleDisplay.style.display = 'none';
        multiDisplay.style.display = 'flex';
        couponContainer.style.display = 'none';
        multiDisplay.innerHTML = '';
        academicSubjects.filter(s => s.type === 'premium').forEach(s => {
            const isSub = currentUserProfile.subscriptions.includes(s.id);
            multiDisplay.innerHTML += `
                <div class="checkbox-item">
                    <input type="checkbox" id="chk-${s.id}" value="${s.id}" ${isSub ? 'disabled' : ''}>
                    <label for="chk-${s.id}">${s.name} (Rs. ${s.price}) ${isSub ? '<span style="color:#059669; font-size:12px;">(Subscribed)</span>' : ''}</label>
                </div>`;
        });
    } else {
        singleDisplay.style.display = 'block';
        multiDisplay.style.display = 'none';
        couponContainer.style.display = 'block';
        document.getElementById('modal-subject-name').innerText = currentSubjectContext.name;
        document.getElementById('modal-subject-price').innerText = `Rs. ${currentSubjectContext.price} / month`;
    }

    calculateTotal();
    document.getElementById('subscription-modal').classList.add('show');
}

function calculateTotal() {
    let subtotal = 0;
    let bundleDiscount = 0;

    if (isMultiSubjectMode) {
        const checked = document.getElementById('subject-checkboxes').querySelectorAll('input:checked');
        subtotal = checked.length * 200;
        if (checked.length >= 3) bundleDiscount = 100;
    } else {
        subtotal = currentSubjectContext ? currentSubjectContext.price : 0;
    }

    let totalDiscount = bundleDiscount + appliedCouponDiscount;
    if (totalDiscount > subtotal && subtotal > 0) totalDiscount = subtotal;

    let grandTotal = subtotal - totalDiscount;

    if (totalDiscount > 0) {
        document.getElementById('original-amount').textContent = `Rs. ${subtotal}`;
        document.getElementById('original-amount').style.display = 'inline';
        document.getElementById('discount-line').style.display = 'block';
        document.getElementById('discount-value').textContent = totalDiscount;
    } else {
        document.getElementById('original-amount').style.display = 'none';
        document.getElementById('discount-line').style.display = 'none';
    }

    document.getElementById('total-amount').innerText = `Rs. ${grandTotal} / month`;
    document.getElementById('total-amount').dataset.subtotal = subtotal;
    document.getElementById('total-amount').dataset.grand = grandTotal;
}

// Reviews Logic
function renderReviews() {
    const rList = document.getElementById('reviews-list');
    if (!rList) return;

    const reviewsQuery = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
    onSnapshot(reviewsQuery, (snapshot) => {
        rList.innerHTML = '';
        snapshot.forEach((doc) => {
            const r = doc.data();
            const initial = r.name ? r.name.charAt(0).toUpperCase() : 'A';
        rList.innerHTML += `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">
                        <div class="review-avatar">${initial}</div>
                        <div class="review-name">${r.name}</div>
                    </div>
                </div>
                <p class="review-text">"${r.text}"</p>
                <div class="review-date">${r.date}</div>
            </div>`;
        });
    });
}

window.openFeedbackModal = function() { document.getElementById('feedback-modal').classList.add('show'); }
window.closeFeedbackModal = function() { document.getElementById('feedback-modal').classList.remove('show'); }
window.submitFeedback = function() {
    const nameInput = document.getElementById('review-user-name');
    const textInput = document.getElementById('user-review');
    const dontShow = document.getElementById('dont-show-again').checked;

    if (!nameInput.value.trim() || !textInput.value.trim()) return alert('Please fill out both your name and review.');

    addDoc(collection(db, "reviews"), {
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        date: "Just now",
        timestamp: new Date().getTime()
    }).then(() => {
        if (dontShow) localStorage.setItem('hide_feedback_popup', 'true');
        closeFeedbackModal();
        nameInput.value = ''; textInput.value = '';
    }).catch(e => {
        console.error("Error adding review: ", e);
        alert("Failed to submit review. Try again.");
    });
}

// =========================================
// 🔥 SURPRISE BOX LOGIC 🔥
// =========================================
let quotesCollection = [];
fetch('assets/surprise.json')
    .then(r => r.json())
    .then(data => { quotesCollection = data; })
    .catch(e => console.error('Error loading surprises:', e));

window.revealSurprise = function() {
    if(quotesCollection.length === 0) return;
    const front = document.getElementById('box-front');
    const content = document.getElementById('box-content');
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start; 
    const twelveHourBlock = 1000 * 60 * 60 * 12;
    const currentSlot = Math.floor(diff / twelveHourBlock);
    const index = currentSlot % quotesCollection.length;
    const todayQuote = quotesCollection[index];

    document.getElementById('daily-type').innerText = todayQuote.type;
    document.getElementById('daily-text').innerText = '"' + todayQuote.text + '"';
    document.getElementById('daily-ref').innerText = "- " + todayQuote.ref;

    front.style.display = 'none';
    content.style.display = 'block';
};

// =========================================
// 🔥 ADHKAR APP LOGIC 🔥
// =========================================
(function() {
    let appEmotions = [];
    let appResources = [];
    const niceColors = ["linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)", "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)", "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)", "linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)", "linear-gradient(135deg, #20E2D7 0%, #F9FEA5 100%)"];
    
    // Fetch resources directly from 'assets' folder
    fetch('assets/emotion.json').then(r => r.json()).then(d => { appEmotions = d; return fetch('assets/resource.json'); }).then(r => r.json()).then(d => { appResources = d; initGrid(); }).catch(e => { console.error(e); const gridArea = document.getElementById('adhkar-grid-area'); if(gridArea) gridArea.innerHTML = '<p style="color:red; text-align:center;">Error loading Adhkar data.</p>'; });

    function initGrid() {
        const gridArea = document.getElementById('adhkar-grid-area');
        if(!gridArea) return;
        gridArea.innerHTML = '';
        appEmotions.forEach((emo, index) => {
            if(!emo.title) return;
            const div = document.createElement('div');
            div.className = 'adhkar-card';
            div.style.background = niceColors[index % niceColors.length];
            div.innerHTML = `<div class="adhkar-card-title">${emo.title}</div>`;
            div.onclick = () => openCorrectDetail(emo.id, emo.title);
            gridArea.appendChild(div);
        });
    }
    window.openCorrectDetail = function(emotionID, emotionTitle) {
        const listArea = document.getElementById('adhkar-list-area');
        const titleArea = document.getElementById('adhkar-title');
        const drawer = document.getElementById('adhkar-drawer');
        const overlay = document.getElementById('adhkar-drawer-overlay');
        
        titleArea.innerText = emotionTitle;
        listArea.innerHTML = '';
        const filtered = appResources.filter(r => {
            if(!r.emotions) return false;
            const linkedEmotions = String(r.emotions).split(',').map(s => s.trim());
            return linkedEmotions.includes(String(emotionID));
        });
        if(filtered.length === 0) {
            listArea.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8; font-weight:500;">No Duas found for this emotion yet.<br><small>(ID: ${emotionID})</small></div>`;
        } else {
            listArea.innerHTML = `<div style="padding:0 5px 15px; color:#64748b; font-size:13px; font-weight:600;">Found ${filtered.length} Supplication(s)</div>`;
            filtered.forEach((d, index) => {
                let displayTitle = d.title || (d.translation ? d.translation.substring(0, 30)+"..." : "Dua " + (index+1));
                listArea.innerHTML += `<div class="list-item" onclick="toggleDua(this)"><div class="list-title-bar"><span>${index + 1}. ${displayTitle}</span><span class="arrow-icon" style="color:#cbd5e1; font-size:12px;">▼</span></div><div class="list-body"><div class="dua-content"><div class="a-arabic">${d.arabic || ''}</div><div class="a-trans">${d.translation || ''}</div><div class="a-ref">${d.reference || ''}</div></div></div></div>`;
            });
        }
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    window.toggleDua = function(el) {
        el.classList.toggle('open');
        var body = el.querySelector('.list-body');
        body.style.maxHeight = body.style.maxHeight ? null : body.scrollHeight + "px";
    }
    window.closeAdhkarDetail = function() {
        const drawer = document.getElementById('adhkar-drawer');
        const overlay = document.getElementById('adhkar-drawer-overlay');
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    window.triggerShare = function(type) {
        const siteUrl = new URL('login.html', window.location.href).href;
        let text = "";
        switch(type) {
            case 'cv':
                text = `Elevate your professional profile with Caversity's ATS-friendly Resume Builder, designed specifically for CA and ACCA students. Create your standout resume for free today!\n\nAccess here: ${siteUrl}`;
                break;
            case 'qarcs':
                text = `Discover Q-ARCS at Caversity—a groundbreaking 3D visual engine connecting corporate ethics with deep Quranic insights. A truly profound perspective awaits.\n\nExplore here: ${siteUrl}`;
                break;
            case 'adhkar':
                text = `Find spiritual comfort and guidance tailored to your emotional state. Caversity's Adhkar portal provides relevant supplications to help calm the mind and soul during stressful times.\n\nFind your peace here: ${siteUrl}`;
                break;
        }
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    }
})();
