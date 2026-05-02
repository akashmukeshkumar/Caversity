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
    { id: 'caf1', name: 'CAF 1: Financial Accounting and Reporting I', price: 200, type: 'premium', url: 'subjects/caf1/index.html' },
    { id: 'caf2', name: 'CAF 2: Tax Practices', price: 200, type: 'premium', url: 'subjects/caf2/index.html' },
    { id: 'caf3', name: 'CAF 3: Cost and Management Accounting', price: 200, type: 'premium', url: 'subjects/caf3/index.html' },
    { id: 'caf4', name: 'CAF 4: Business Law', price: 200, type: 'premium', url: 'subjects/caf4/index.html' },
    { id: 'caf5', name: 'CAF 5: Financial Accounting and Reporting II', price: 200, type: 'premium', url: 'subjects/caf5/index.html' },
    { id: 'caf6', name: 'CAF 6: Managerial and Financial Analysis', price: 200, type: 'premium', url: 'subjects/caf6/index.html' },
    { id: 'caf7', name: 'CAF 7: Company Law', price: 200, type: 'premium', url: 'subjects/caf7/index.html' },
    { id: 'caf8', name: 'CAF 8: Audit and Assurance', price: 200, type: 'premium', url: 'subjects/caf8_audit/index.html' },
    { id: 'resume', name: 'CA Resume Builder', price: 0, type: 'free', url: 'features/html/resume.html' },
    { id: 'sanctuary', name: 'The Sanctuary', price: 0, type: 'free', url: 'sanctuary.html' }
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
                buttonText = 'Open Subject';
                buttonClass = 'subscribed-action';
            }
        } else {
            buttonText = 'Access for Free';
            buttonClass = 'free-action';
        }

        card.innerHTML = `
            <h3 class="subject-title">${subject.name}</h3>
            <p class="subject-description">Premium CA content tailored for your success.</p>
            <button class="subject-action ${buttonClass}" data-id="${subject.id}">${buttonText}</button>
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
                localStorage.removeItem('caversity_device_token');
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
