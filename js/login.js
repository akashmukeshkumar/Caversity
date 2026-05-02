import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Form DOM Elements
const authModal = document.getElementById('auth-modal');
const navSigninBtn = document.getElementById('nav-signin-btn');
const heroGetStartedBtn = document.getElementById('hero-get-started');
const closeBtn = document.getElementById('auth-close-btn');
const heroEmailInput = document.getElementById('hero-email');

const signinForm = document.getElementById('signin-form');
const registerForm = document.getElementById('register-form');
const linkToRegister = document.getElementById('link-to-register');
const linkToSignin = document.getElementById('link-to-signin');

function openModal(formType) {
    authModal.classList.add('show');
    if(formType === 'register') {
        signinForm.classList.remove('active');
        registerForm.classList.add('active');
    } else {
        registerForm.classList.remove('active');
        signinForm.classList.add('active');
    }
}

// Event Listeners for UI
navSigninBtn.addEventListener('click', () => openModal('signin'));
heroGetStartedBtn.addEventListener('click', () => {
    if(heroEmailInput.value) document.getElementById('register-email').value = heroEmailInput.value;
    openModal('register');
});
closeBtn.addEventListener('click', () => authModal.classList.remove('show'));
linkToRegister.addEventListener('click', (e) => { e.preventDefault(); openModal('register'); });
linkToSignin.addEventListener('click', (e) => { e.preventDefault(); openModal('signin'); });

// Show/Hide Password Eye Icon Logic
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

// Secret Code Generator for Device Lock
function generateDeviceToken() {
    return 'cv_sys_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now();
}

// 🔥 REGISTER (SIGN UP) LOGIC
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const btn = e.target.querySelector('button');

    try {
        btn.innerText = "Creating Account...";
        btn.disabled = true;

        // 1. Create User in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Generate and Save Device Lock Token locally
        const deviceToken = generateDeviceToken();
        localStorage.setItem('caversity_device_token', deviceToken);

        // 3. Save User Profile in Firestore Database
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            phone: phone,
            deviceToken: deviceToken,
            subscriptions: {
                caf1: false, caf2: false, caf3: false, caf4: false,
                caf5: false, caf6: false, caf7: false, caf8: false
            }
        });

        // Redirect to Portal
        window.location.href = "portal.html";

    } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
            alert("⚠️ Registration Failed: This email is already registered!\nEk email par doosra account nahi ban sakta. Agar aapki device change hui hai toh 'Sign In' karein aur Admin se token reset karwayen.");
        } else {
            alert("Registration Failed: " + error.message);
        }
        btn.innerText = "Join Caversity";
        btn.disabled = false;
    }
});

// 🔥 LOGIN (SIGN IN) LOGIC
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const btn = e.target.querySelector('button');

    try {
        btn.innerText = "Verifying...";
        btn.disabled = true;

        // 1. Authenticate with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. STRICT DEVICE LOCK CHECK
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const localToken = localStorage.getItem('caversity_device_token');

            if (userData.deviceToken && userData.deviceToken !== "" && userData.deviceToken !== localToken) {
                await auth.signOut(); // Fauran bahar nikal do
                throw new Error("Device Locked! This account is registered on another device. Please contact Admin to reset.");
            }

            // Agar Admin ne DB se token khali (reset) kar diya hai, toh naya token lagao
            if (!userData.deviceToken || userData.deviceToken === "") {
                const newDeviceToken = generateDeviceToken();
                localStorage.setItem('caversity_device_token', newDeviceToken);
                await updateDoc(docRef, { deviceToken: newDeviceToken });
            }
        }

        // Redirect to Portal
        window.location.href = "portal.html";

    } catch (error) {
        console.error(error);
        if (error.message.includes("Device Locked")) {
            alert("⚠️ " + error.message);
        } else {
            alert("Login Failed: Invalid Email or Password.");
        }
        btn.innerText = "Sign In";
        btn.disabled = false;
    }
});

// Auto-Redirect if Already Logged In
onAuthStateChanged(auth, (user) => {
    if (user && localStorage.getItem('caversity_device_token')) {
        window.location.replace("portal.html");
    }
});
