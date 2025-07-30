// assets/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const authButtonsContainer = document.querySelector('.auth-buttons');
    const navUl = document.querySelector('nav ul');

    // This is a simulation. In a real app, you'd check a token or session.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // User is logged in
        authButtonsContainer.innerHTML = '<button id="logout-btn" class="btn">Log Out</button>';
        
        const profileLink = document.createElement('li');
        profileLink.innerHTML = '<a href="profile.html"><i class="fas fa-user"></i> Profile</a>';
        navUl.appendChild(profileLink);

        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });

    } else {
        // User is logged out
        authButtonsContainer.innerHTML = `
            <a href="login.html" class="btn login">Log In</a>
            <a href="signup.html" class="btn signup">Sign Up</a>
        `;
    }

    // Mock login/signup form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'profile.html';
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'profile.html';
        });
    }
});
