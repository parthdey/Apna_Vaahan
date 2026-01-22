const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api';

let currentUser = null;

async function init() {
    // Check if user is logged in by validating session
    try {
        const res = await fetch(`${API_BASE}/auth/me`, {
            credentials: 'include'
        });

        if (res.ok) {
            // User is logged in
            currentUser = await res.json();
            localStorage.setItem('user', JSON.stringify(currentUser));
            showLoggedInView();
        } else {
            // Not logged in
            currentUser = null;
            localStorage.removeItem('user');
            showGuestView();
        }
    } catch (err) {
        // Network error, check localStorage as fallback
        currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            showLoggedInView();
        } else {
            showGuestView();
        }
    }
}

function showGuestView() {
    // Hide logged-in content
    document.getElementById('logged-in-header').style.display = 'none';
    document.getElementById('logged-in-content').style.display = 'none';

    // Show guest content
    document.getElementById('guest-header').style.display = 'block';
    document.getElementById('guest-content').style.display = 'block';
}

function showLoggedInView() {
    // Hide guest content
    document.getElementById('guest-header').style.display = 'none';
    document.getElementById('guest-content').style.display = 'none';

    // Show logged-in content
    document.getElementById('logged-in-header').style.display = 'flex';
    document.getElementById('logged-in-content').style.display = 'block';

    // Set user name
    if (currentUser && currentUser.name) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('welcome-name').textContent = currentUser.name;
    }
}

async function logout(e) {
    e.preventDefault();

    try {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (err) {
        console.error('Logout request failed');
    }

    localStorage.removeItem('user');
    window.location.reload();
}

// Initialize on page load
init();









/////////// new
//const API_BASE =
//  window.location.hostname === 'localhost'
//    ? 'http://localhost:8080/api'
//    : '/api';
//
//let currentUser = null;
//
//async function init() {
//    // Check if user is logged in by validating session
//    try {
//        const res = await fetch(`${API_BASE}/auth/me`, {
//            credentials: 'include'
//        });
//
//        if (res.ok) {
//            // User is logged in
//            currentUser = await res.json();
//            localStorage.setItem('user', JSON.stringify(currentUser));
//            showLoggedInView();
//
//            // Add scroll effect for navbar
//            window.addEventListener('scroll', handleNavbarScroll);
//        } else {
//            // Not logged in
//            currentUser = null;
//            localStorage.removeItem('user');
//            showGuestView();
//        }
//    } catch (err) {
//        // Network error, check localStorage as fallback
//        currentUser = JSON.parse(localStorage.getItem('user'));
//        if (currentUser) {
//            showLoggedInView();
//            window.addEventListener('scroll', handleNavbarScroll);
//        } else {
//            showGuestViewconst API_BASE =
//  window.location.hostname === 'localhost'
//    ? 'http://localhost:8080/api'
//    : '/api';
//
//let currentUser = null;
//
//async function init() {
//    // Check if user is logged in by validating session
//    try {
//        const res = await fetch(`${API_BASE}/auth/me`, {
//            credentials: 'include'
//        });
//
//        if (res.ok) {
//            // User is logged in
//            currentUser = await res.json();
//            localStorage.setItem('user', JSON.stringify(currentUser));
//            showLoggedInView();
//
//            // Add scroll effect for navbar
//            window.addEventListener('scroll', handleNavbarScroll);
//        } else {
//            // Not logged in
//            currentUser = null;
//            localStorage.removeItem('user');
//            showGuestView();
//        }
//    } catch (err) {
//        // Network error, check localStorage as fallback
//        currentUser = JSON.parse(localStorage.getItem('user'));
//        if (currentUser) {
//            showLoggedInView();
//            window.addEventListener('scroll', handleNavbarScroll);
//        } else {
//            showGuestView();
//        }
//    }
//}
//
//function handleNavbarScroll() {
//    const navbar = document.getElementById('logged-in-header');
//    if (navbar) {
//        if (window.scrollY > 50) {
//            navbar.classList.add('scrolled');
//        } else {
//            navbar.classList.remove('scrolled');
//        }
//    }
//}
//
//function showGuestView() {
//    // Hide logged-in content
//    document.getElementById('logged-in-header').style.display = 'none';
//    document.getElementById('logged-in-content').style.display = 'none';
//    document.body.classList.remove('logged-in');
//
//    // Show guest content
//    document.getElementById('guest-header').style.display = 'block';
//    document.getElementById('guest-content').style.display = 'block';
//}
//
//function showLoggedInView() {
//    // Hide guest content
//    document.getElementById('guest-header').style.display = 'none';
//    document.getElementById('guest-content').style.display = 'none';
//
//    // Show logged-in content
//    document.getElementById('logged-in-header').style.display = 'flex';
//    document.getElementById('logged-in-content').style.display = 'block';
//    document.body.classList.add('logged-in');
//
//    // Set user name
//    if (currentUser && currentUser.name) {
//        document.getElementById('user-name').textContent = currentUser.name;
//        document.getElementById('welcome-name').textContent = currentUser.name;
//    }
//}
//
//async function logout(e) {
//    e.preventDefault();
//
//    try {
//        await fetch(`${API_BASE}/auth/logout`, {
//            method: 'POST',
//            credentials: 'include'
//        });
//    } catch (err) {
//        console.error('Logout request failed');
//    }
//
//    localStorage.removeItem('user');
//    window.location.reload();
//}
//
//// Initialize on page load
//init();