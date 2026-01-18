//const API_BASE = 'http://localhost:8080/api';
//let currentUser = null;
//let refreshInterval = null;
//
//async function init() {
//    currentUser = JSON.parse(localStorage.getItem('user'));
//    if (!currentUser) {
//        window.location.href = '/login.html';
//        return;
//    }
//    document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;
//
//    // Load data immediately
//    await loadMyRequests();
//
//    // Set up auto-refresh every 5 seconds
//    refreshInterval = setInterval(async () => {
//        await loadMyRequests();
//    }, 5000);
//}
//
//// Clean up interval when leaving page
//window.addEventListener('beforeunload', () => {
//    if (refreshInterval) {
//        clearInterval(refreshInterval);
//    }
//});
//
////async function loadMyRequests() {
////    const loading = document.getElementById('loading');
////    const container = document.getElementById('requests-container');
////
////    loading.style.display = 'block';
////
////    try {
////        const response = await fetch(`${API_BASE}/requests/sent`, {
////            method: 'GET',
////            credentials: 'include'
////        });
////        const requests = await response.json();
////
////        loading.style.display = 'none';
////
////        if (requests.length === 0) {
////            container.innerHTML = `
////                <div class="empty-state">
////                    <div class="empty-state-icon">📭</div>
////                    <h3>No requests yet</h3>
////                    <p>Search for rides and send requests!</p>
////                </div>
////            `;
////            return;
////        }
////
////        container.innerHTML = '';
////        requests.forEach(req => {
////            container.innerHTML += createRequestCard(req);
////        });
////    } catch (error) {
////        console.error('Error loading requests:', error);
////        loading.style.display = 'none';
////        showAlert('Failed to load requests', 'error');
////    }
////}
//
////async function loadMyRequests() {
////    const loading = document.getElementById('loading');
////    const container = document.getElementById('requests-container');
////
////    loading.style.display = 'block';
////
////    try {
////        const response = await fetch(`${API_BASE}/requests/sent`, {
////            method: 'GET',
////            credentials: 'include'
////        });
////
////        // 🔴 HANDLE 401 FIRST
////        if (response.status === 401) {
////            throw new Error('UNAUTHORIZED');
////        }
////
////        if (!response.ok) {
////            throw new Error('FAILED_REQUEST');
////        }
////
////        const requests = await response.json();
////
////        loading.style.display = 'none';
////
////        if (!Array.isArray(requests)) {
////            throw new Error('INVALID_RESPONSE');
////        }
////
////        if (requests.length === 0) {
////            container.innerHTML = `
////                <div class="empty-state">
////                    <div class="empty-state-icon">📭</div>
////                    <h3>No requests yet</h3>
////                    <p>Search for rides and send requests!</p>
////                </div>
////            `;
////            return;
////        }
////
////        container.innerHTML = '';
////        requests.forEach(req => {
////            container.innerHTML += createRequestCard(req);
////        });
////
////    } catch (error) {
////        loading.style.display = 'none';
////
////        if (error.message === 'UNAUTHORIZED') {
////            showAlert('Session expired. Please login again.', 'error');
////            localStorage.removeItem('user');
////            setTimeout(() => {
////                window.location.href = '/login.html';
////            }, 1500);
////        } else {
////            console.error('Error loading requests:', error);
////            showAlert('Failed to load requests', 'error');
////        }
////    }
////}
//
//
//
//function createRequestCard(request) {
//    return `
//        <div class="ride-card">
//            <div class="ride-header">
//                <div class="ride-info">
//                    <h3>Ride to ${request.passengerDestination}</h3>
//                    <p style="color: #718096; margin: 5px 0;">Requested on ${new Date(request.requestedAt).toLocaleDateString()}</p>
//                </div>
//                <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span>
//            </div>
//
//            <div class="ride-details">
//                <div class="detail-item">
//                    <span class="detail-label">💺 Seats Requested</span>
//                    <span class="detail-value">${request.seatsRequested}</span>
//                </div>
//            </div>
//
//            ${request.status === 'PENDING' ? `
//                <p style="color: #718096; margin-top: 10px;">⏳ Waiting for rider approval...</p>
//            ` : ''}
//
//            ${request.status === 'ACCEPTED' ? `
//                <div style="background: #c6f6d5; padding: 15px; border-radius: 8px; margin-top: 10px;">
//                    <p style="color: #22543d; margin: 0; font-weight: 600;">✓ Request Accepted!</p>
//                    <p style="color: #22543d; margin: 5px 0 0 0;">The rider will contact you soon. Check your phone for calls.</p>
//                </div>
//            ` : ''}
//
//            ${request.status === 'REJECTED' ? `
//                <div style="background: #fed7d7; padding: 15px; border-radius: 8px; margin-top: 10px;">
//                    <p style="color: #742a2a; margin: 0;">✗ Request was rejected. Try another ride.</p>
//                </div>
//            ` : ''}
//        </div>
//    `;
//}
//
//function showAlert(message, type) {
//    const alertContainer = document.getElementById('alert-container');
//    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
//    setTimeout(() => {
//        alertContainer.innerHTML = '';
//    }, 5000);
//}
//
//function logout(e) {
//    e.preventDefault();
//    localStorage.removeItem('user');
//    window.location.href = '/';
//}
//
//// Initialize on page load
//init();

const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api';

let currentUser = null;
let refreshInterval = null;

async function init() {
    currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
        window.location.href = '/login.html';
        return;
    }
    document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;

    // Load data immediately
    await loadMyRequests();

    // Set up auto-refresh every 5 seconds
    refreshInterval = setInterval(async () => {
        await loadMyRequests();
    }, 5000);
}

// Clean up interval when leaving page
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});

async function loadMyRequests() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('requests-container');

    loading.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE}/requests/sent`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.message || `Server error: ${response.status}`;
            throw new Error(errorMsg);
        }

        const requests = await response.json();
        console.log('Loaded requests:', requests);

        loading.style.display = 'none';

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <h3>No requests yet</h3>
                    <p>Search for rides and send requests!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        requests.forEach(req => {
            container.innerHTML += createRequestCard(req);
        });
    } catch (error) {
        console.error('Error loading requests:', error);
        loading.style.display = 'none';

        // Show more detailed error message
        container.innerHTML = `
            <div class="alert alert-error">
                <strong>Failed to load requests</strong><br>
                ${error.message}<br><br>
                <small>Please try logging out and logging back in.</small>
            </div>
        `;
    }
}

function createRequestCard(request) {
    return `
        <div class="ride-card">
            <div class="ride-header">
                <div class="ride-info">
                    <h3>Ride to ${request.passengerDestination}</h3>
                    <p style="color: #718096; margin: 5px 0;">Requested on ${new Date(request.requestedAt).toLocaleDateString()}</p>
                </div>
                <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span>
            </div>

            <div class="ride-details">
                <div class="detail-item">
                    <span class="detail-label">💺 Seats Requested</span>
                    <span class="detail-value">${request.seatsRequested}</span>
                </div>
            </div>

            ${request.status === 'PENDING' ? `
                <p style="color: #718096; margin-top: 10px;">⏳ Waiting for rider approval...</p>
            ` : ''}

            ${request.status === 'ACCEPTED' ? `
                <div style="background: #c6f6d5; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <p style="color: #22543d; margin: 0; font-weight: 600;">✓ Request Accepted!</p>
                    <p style="color: #22543d; margin: 5px 0 0 0;">The rider will contact you soon. Check your phone for calls.</p>
                </div>
            ` : ''}

            ${request.status === 'REJECTED' ? `
                <div style="background: #fed7d7; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <p style="color: #742a2a; margin: 0;">✗ Request was rejected. Try another ride.</p>
                </div>
            ` : ''}
        </div>
    `;
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

function logout(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = '/';
}

// Initialize on page load
init();