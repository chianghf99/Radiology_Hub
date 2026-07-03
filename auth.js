import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    deleteDoc, 
    collection, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFKkYhLe_s4R10wuP80T1OHkGLFLn2epE",
    authDomain: "radiology-hub-80908.firebaseapp.com",
    projectId: "radiology-hub-80908",
    storageBucket: "radiology-hub-80908.firebasestorage.app",
    messagingSenderId: "508499242885",
    appId: "1:508499242885:web:885a5f469fe30bf32f9eec",
    measurementId: "G-14TEJRN2LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const SUPER_ADMIN = "chicken7999@gmail.com";

// Store original template content immediately
let contentClone = null;
const template = document.getElementById('page-content');
if (template) {
    contentClone = document.importNode(template.content, true);
    template.remove();
}

// Global flag to prevent double initialization
let isInitialized = false;

// Listen to Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const isAuthorized = await checkUserAuthorization(user);
        if (isAuthorized) {
            showPageContent(user);
        } else {
            showAccessDenied(user);
        }
    } else {
        showLoginGate();
    }
});

// Check if user is whitelisted or admin
async function checkUserAuthorization(user) {
    if (user.email === SUPER_ADMIN) return true;
    try {
        // Try to read their own whitelist document
        const docRef = doc(db, "whitelist", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return true;

        // Try admins collection just in case
        const adminRef = doc(db, "admins", user.email);
        const adminSnap = await getDoc(adminRef);
        if (adminSnap.exists()) return true;
    } catch (e) {
        console.error("Authorization check failed:", e);
    }
    return false;
}

// Function to activate and execute scripts in the cloned template
function activateScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

// Reveal page content to authorized users
function showPageContent(user) {
    if (isInitialized) return;
    isInitialized = true;

    // Reset body classes and clear any auth gates
    document.body.innerHTML = '';
    document.body.className = '';
    document.body.classList.add('auth-checked');

    // Append original page content
    if (contentClone) {
        document.body.appendChild(contentClone.cloneNode(true));
        activateScripts(document.body);
    }

    // Add back to home link if we are not on the index page
    addBackToHomeIfNeeded();

    // If super admin or admin, initialize the admin panel on the index/hub page
    const isAdminUser = user.email === SUPER_ADMIN; // Can expand to check admins collection if needed
    if (isAdminUser && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Radiology_Hub/'))) {
        initAdminPanel();
    }
}

// Render Google Login Gate
function showLoginGate() {
    isInitialized = false;
    document.body.innerHTML = '';
    document.body.className = 'auth-gate-active';

    const container = document.createElement('div');
    container.id = 'auth-gate-container';

    container.innerHTML = `
        <div class="auth-card">
            <div class="auth-logo">🧠</div>
            <h1 class="auth-title">Radiology Hub</h1>
            <p class="auth-subtitle">馬偕神經放射科工具與班表系統</p>
            <button id="auth-login-btn" class="auth-btn-google">
                <svg viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google 帳號登入
            </button>
        </div>
    `;

    document.body.appendChild(container);

    document.getElementById('auth-login-btn').addEventListener('click', () => {
        signInWithPopup(auth, provider).catch(err => {
            console.error("Login failed:", err);
            alert("登入失敗：" + err.message);
        });
    });
}

// Render Access Denied Gate
function showAccessDenied(user) {
    isInitialized = false;
    document.body.innerHTML = '';
    document.body.className = 'auth-gate-active';

    const container = document.createElement('div');
    container.id = 'auth-gate-container';

    container.innerHTML = `
        <div class="auth-card">
            <div class="auth-logo">🔒</div>
            <h1 class="auth-title">無存取權限</h1>
            <p class="auth-subtitle">您的帳號目前未在授權白名單內</p>
            <div style="margin: 15px 0; font-size: 0.95rem; color: #ddd;">
                已登入：<strong>${user.email}</strong>
            </div>
            <div class="auth-error-card">
                請聯絡系統管理員將您的 Email 加入白名單，方可存取本系統所有工具與班表。
            </div>
            <button id="auth-logout-btn" class="auth-btn-logout">登出帳號</button>
        </div>
    `;

    document.body.appendChild(container);

    document.getElementById('auth-logout-btn').addEventListener('click', () => {
        signOut(auth);
    });
}

// Add back-to-home navigation link if missing on subpages
function addBackToHomeIfNeeded() {
    // Only check subpages, not index/hub
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Radiology_Hub/')) {
        return;
    }
    
    // Check if back link already exists in HTML
    if (document.querySelector('.back-link')) return;

    const firstContainer = document.querySelector('.report-container') || document.querySelector('main') || document.body.firstChild;
    if (firstContainer && firstContainer.parentNode) {
        const backLink = document.createElement('a');
        backLink.href = 'index.html';
        backLink.className = 'back-link';
        backLink.innerHTML = '← 返回 Hub 首頁';
        backLink.style.marginBottom = '20px';
        backLink.style.display = 'inline-flex';
        
        if (firstContainer.parentNode === document.body) {
            document.body.insertBefore(backLink, firstContainer);
        } else {
            firstContainer.insertBefore(backLink, firstContainer.firstChild);
        }
    }
}

// Initialize Admin Whitelist Management Panel
async function initAdminPanel() {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    // Create the admin panel DOM element
    const adminDiv = document.createElement('div');
    adminDiv.className = 'admin-panel';
    adminDiv.innerHTML = `
        <h3>🛠 系統權限管理 (僅管理員可見)</h3>
        <div class="admin-form">
            <input type="email" id="new-whitelist-email" placeholder="輸入要授權的使用者 Email (例如: user@gmail.com)">
            <button id="add-whitelist-btn">➕ 新增授權</button>
        </div>
        <div style="overflow-x: auto;">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>授權 Email</th>
                        <th>加入時間</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="whitelist-tbody">
                    <tr>
                        <td colspan="3" style="text-align: center; color: #888;">載入中...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    mainEl.appendChild(adminDiv);

    const tbody = document.getElementById('whitelist-tbody');
    const addBtn = document.getElementById('add-whitelist-btn');
    const emailInput = document.getElementById('new-whitelist-email');

    // Load Whitelist
    async function loadWhitelist() {
        try {
            tbody.innerHTML = '';
            const querySnapshot = await getDocs(collection(db, "whitelist"));
            
            if (querySnapshot.empty) {
                tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #888;">目前無自訂授權名單 (預設僅有 Super Admin 可登入)</td></tr>`;
                return;
            }

            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const email = docSnap.id;
                const addedAt = data.addedAt ? new Date(data.addedAt.seconds * 1000).toLocaleString() : '未知';
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${email}</strong></td>
                    <td>${addedAt}</td>
                    <td><button class="btn-revoke" data-email="${email}">❌ 撤銷授權</button></td>
                `;
                tbody.appendChild(tr);
            });

            // Bind revoke buttons
            document.querySelectorAll('.btn-revoke').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const emailToRevoke = e.target.getAttribute('data-email');
                    if (confirm(`確定要撤銷對 ${emailToRevoke} 的存取授權嗎？`)) {
                        try {
                            await deleteDoc(doc(db, "whitelist", emailToRevoke));
                            alert(`已撤銷 ${emailToRevoke} 的授權`);
                            loadWhitelist();
                        } catch (err) {
                            console.error("Failed to delete whitelist entry:", err);
                            alert("撤銷失敗，請確認資料庫權限設定！");
                        }
                    }
                });
            });
        } catch (err) {
            console.error("Failed to load whitelist:", err);
            tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">載入白名單失敗，請確認 Firebase Rules 設定或網路連線。</td></tr>`;
        }
    }

    // Add Email to Whitelist
    addBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim().toLowerCase();
        if (!email) {
            alert("請輸入有效的 Email！");
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("請輸入正確的 Email 格式！");
            return;
        }

        try {
            addBtn.disabled = true;
            addBtn.textContent = "新增中...";
            
            await setDoc(doc(db, "whitelist", email), {
                email: email,
                addedAt: new Date()
            });

            alert(`成功授權：${email}`);
            emailInput.value = '';
            loadWhitelist();
        } catch (err) {
            console.error("Failed to add whitelist entry:", err);
            alert("新增失敗，請確認資料庫權限設定！");
        } finally {
            addBtn.disabled = false;
            addBtn.textContent = "➕ 新增授權";
        }
    });

    // Enter key support for input
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    // Initial load of whitelist
    loadWhitelist();
}
