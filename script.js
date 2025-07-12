// Simple client‑side authentication demo (localStorage + sessionStorage)
// IMPORTANT: Do NOT use this method for production apps.

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const secureSection = document.getElementById('secure');
    const authSection = document.getElementById('auth');
    const userLabel = document.getElementById('user-label');
    const logoutBtn = document.getElementById('logout');

    /** Helpers **/
    const loadUsers = () => JSON.parse(localStorage.getItem('users') || '{}');
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

    /** Registration **/
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value;
        if (!username || !password) return alert('Please enter credentials.');

        const users = loadUsers();
        if (users[username]) return alert('User already exists!');

        users[username] = btoa(password); // Very primitive "hash" for demo only
        saveUsers(users);
        alert('Registration successful! You can now log in.');
        registerForm.reset();
    });

    /** Login **/
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const users = loadUsers();

        if (users[username] && users[username] === btoa(password)) {
            sessionStorage.setItem('sessionUser', username);
            showSecure(username);
        } else {
            alert('Invalid credentials.');
        }
    });

    /** Logout **/
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('sessionUser');
        secureSection.classList.add('hidden');
        authSection.classList.remove('hidden');
    });

    /** Auto‑login if session exists **/
    const currentUser = sessionStorage.getItem('sessionUser');
    if (currentUser) showSecure(currentUser);

    function showSecure(username) {
        userLabel.textContent = username;
        authSection.classList.add('hidden');
        secureSection.classList.remove('hidden');
    }
});
