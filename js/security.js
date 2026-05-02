import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// HTML se Meta tags read karo taake pata chale page Free hai ya Premium
const pageIdMeta = document.querySelector('meta[name="page-id"]');
const pageTypeMeta = document.querySelector('meta[name="page-type"]');
const PAGE_ID = pageIdMeta ? pageIdMeta.getAttribute("content") : null;
const PAGE_TYPE = pageTypeMeta ? pageTypeMeta.getAttribute("content") : null;

// 🔥 SMART REDIRECT FUNCTION (Folder structure handle karne ke liye) 🔥
function redirectTo(page) {
    const path = window.location.pathname;
    const htmlIndex = path.indexOf('/html/');
    if (htmlIndex !== -1) {
        const basePath = path.substring(0, htmlIndex);
        window.location.replace(window.location.origin + basePath + "/html/" + page);
    } else {
        let basePath = path.replace(/\/[^\/]*$/, '');
        window.location.replace(window.location.origin + basePath + "/html/" + page);
    }
}

onAuthStateChanged(auth, async (user) => {
    if (window.isAuthenticating) return; // Agar login/register ho raha hai toh interrupt na karo

    if (!user) { 
        if (PAGE_TYPE !== "auth") {
            redirectTo("login.html"); 
        } else {
            const lockStyle = document.getElementById('page-lock');
            if (lockStyle) lockStyle.remove();
        }
        return; 
    }
    
    try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // 1. UNIVERSAL DEVICE LOCK (For both Free and Premium)
            if (userData.deviceToken !== localStorage.getItem('caversity_device_token')) {
                await signOut(auth);
                alert("⚠️ Security Alert: Session Terminated!\n\nYour account is actively linked to another device. For security purposes, simultaneous access is not permitted.\n\nPlease contact Support to authorize this device.");
                redirectTo("login.html");
                return;
            }
            
            // 2. PREMIUM SUBSCRIPTION CHECK (Sirf Premium Pages ke liye)
            if (PAGE_TYPE === "premium" && PAGE_ID) {
                const subExpiry = userData.subscriptions?.[PAGE_ID];
                if (!subExpiry || new Date(subExpiry) <= new Date()) {
                    alert("⚠️ Access Denied! You do not have an active subscription for this subject.");
                    redirectTo("portal.html");
                    return;
                }
            }

            // Agar login page par hai aur pehle se logged in hai, toh portal bhej do
            if (PAGE_TYPE === "auth") {
                redirectTo("portal.html");
                return;
            }

            // 3. SAB THEEK HAI - PAGE SHOW KAR DO
            const lockStyle = document.getElementById('page-lock');
            if(lockStyle) lockStyle.remove();
            
        } else {
            // ⚠️ BROKEN STATE FIX: Agar auth hai par DB folder nahi bana, toh safai kar do!
            await signOut(auth);
            localStorage.removeItem('caversity_device_token');
            if (PAGE_TYPE !== "auth") {
                redirectTo("login.html");
            } else {
                const lockStyle = document.getElementById('page-lock');
                if (lockStyle) lockStyle.remove();
            }
        }
    } catch (e) { console.error("Auth check failed:", e); }
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
