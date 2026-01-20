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

//const API_BASE =
//  window.location.hostname === 'localhost'
//    ? 'http://localhost:8080/api'
//    : '/api';
//
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
//async function loadMyRequests() {
//    const loading = document.getElementById('loading');
//    const container = document.getElementById('requests-container');
//
//    loading.style.display = 'block';
//
//    try {
//        const response = await fetch(`${API_BASE}/requests/sent`, {
//            method: 'GET',
//            credentials: 'include',
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        });
//
//        console.log('Response status:', response.status);
//
//        if (!response.ok) {
//            // Try to get error message from response
//            const errorData = await response.json().catch(() => null);
//            const errorMsg = errorData?.message || `Server error: ${response.status}`;
//            throw new Error(errorMsg);
//        }
//
//        const requests = await response.json();
//        console.log('Loaded requests:', requests);
//
//        loading.style.display = 'none';
//
//        if (requests.length === 0) {
//            container.innerHTML = `
//                <div class="empty-state">
//                    <div class="empty-state-icon">📭</div>
//                    <h3>No requests yet</h3>
//                    <p>Search for rides and send requests!</p>
//                </div>
//            `;
//            return;
//        }
//
//        container.innerHTML = '';
//        requests.forEach(req => {
//            container.innerHTML += createRequestCard(req);
//        });
//    } catch (error) {
//        console.error('Error loading requests:', error);
//        loading.style.display = 'none';
//
//        // Show more detailed error message
//        container.innerHTML = `
//            <div class="alert alert-error">
//                <strong>Failed to load requests</strong><br>
//                ${error.message}<br><br>
//                <small>Please try logging out and logging back in.</small>
//            </div>
//        `;
//    }
//}
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




//const API_BASE =
//  window.location.hostname === 'localhost'
//    ? 'http://localhost:8080/api'
//    : '/api';
//
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
//async function loadMyRequests() {
//    const loading = document.getElementById('loading');
//    const container = document.getElementById('requests-container');
//
//    loading.style.display = 'block';
//
//    try {
//        const response = await fetch(`${API_BASE}/requests/sent`, {
//            method: 'GET',
//            credentials: 'include',
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        });
//
//        console.log('Response status:', response.status);
//
//        if (!response.ok) {
//            // Try to get error message from response
//            const errorData = await response.json().catch(() => null);
//            const errorMsg = errorData?.message || `Server error: ${response.status}`;
//            throw new Error(errorMsg);
//        }
//
//        const requests = await response.json();
//        console.log('Loaded requests:', requests);
//
//        loading.style.display = 'none';
//
//        if (requests.length === 0) {
//            container.innerHTML = `
//                <div class="empty-state">
//                    <div class="empty-state-icon">📭</div>
//                    <h3>No requests yet</h3>
//                    <p>Search for rides and send requests!</p>
//                </div>
//            `;
//            return;
//        }
//
//        container.innerHTML = '';
//        requests.forEach(req => {
//            container.innerHTML += createRequestCard(req);
//        });
//    } catch (error) {
//        console.error('Error loading requests:', error);
//        loading.style.display = 'none';
//
//        // Show more detailed error message
//        container.innerHTML = `
//            <div class="alert alert-error">
//                <strong>Failed to load requests</strong><br>
//                ${error.message}<br><br>
//                <small>Please try logging out and logging back in.</small>
//            </div>
//        `;
//    }
//}
//
//function createRequestCard(request) {
//    const statusColors = {
//        'PENDING': { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: '⏳' },
//        'ACCEPTED': { bg: '#d1fae5', border: '#10b981', text: '#065f46', icon: '✅' },
//        'REJECTED': { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', icon: '❌' }
//    };
//
//    const statusStyle = statusColors[request.status] || statusColors['PENDING'];
//
//    return `
//        <div class="ride-card" style="border-left: 4px solid ${statusStyle.border};">
//            <div class="ride-header">
//                <div class="ride-info">
//                    <h3 style="color: #1f2937; margin-bottom: 5px;">
//                        🚗 ${request.rideStartLocation || 'College'} → ${request.rideEndLocation || request.passengerDestination}
//                    </h3>
//                    <p style="color: #6b7280; font-size: 0.9rem; margin: 0;">
//                        📅 ${request.rideDate || 'Date N/A'} at ${request.rideTime || 'Time N/A'}
//                    </p>
//                </div>
//                <span class="status-badge" style="background: ${statusStyle.bg}; color: ${statusStyle.text}; border: 2px solid ${statusStyle.border};">
//                    ${statusStyle.icon} ${request.status}
//                </span>
//            </div>
//
//            <!-- Rider Information -->
//            ${request.riderName ? `
//            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
//                <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 0.95rem;">🏍️ Rider Information</h4>
//                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
//                    <div>
//                        <span style="color: #6b7280; font-size: 0.85rem;">Name</span>
//                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderName}</p>
//                    </div>
//                    <div>
//                        <span style="color: #6b7280; font-size: 0.85rem;">Vehicle</span>
//                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderVehicleModel || 'Two Wheeler'}</p>
//                    </div>
//                    <div>
//                        <span style="color: #6b7280; font-size: 0.85rem;">Vehicle Number</span>
//                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderVehicleNumber || 'N/A'}</p>
//                    </div>
//                    ${request.status === 'ACCEPTED' && request.riderPhone ? `
//                    <div>
//                        <span style="color: #6b7280; font-size: 0.85rem;">📞 Contact</span>
//                        <p style="color: #059669; margin: 3px 0; font-weight: 600; font-size: 1.1rem;">
//                            <a href="tel:${request.riderPhone}" style="color: #059669; text-decoration: none;">${request.riderPhone}</a>
//                        </p>
//                    </div>
//                    ` : ''}
//                </div>
//            </div>
//            ` : ''}
//
//            <!-- Trip Details -->
//            <div class="ride-details" style="background: #ffffff; padding: 12px; border-radius: 8px; margin-top: 10px;">
//                <div class="detail-item">
//                    <span class="detail-label">📍 Your Destination</span>
//                    <span class="detail-value">${request.passengerDestination}</span>
//                </div>
//                <div class="detail-item">
//                    <span class="detail-label">💺 Seats</span>
//                    <span class="detail-value">${request.seatsRequested}</span>
//                </div>
//                ${request.rideDistance ? `
//                <div class="detail-item">
//                    <span class="detail-label">📏 Distance</span>
//                    <span class="detail-value">${request.rideDistance} km</span>
//                </div>
//                ` : ''}
//                ${request.rideCost ? `
//                <div class="detail-item">
//                    <span class="detail-label">💰 Total Cost</span>
//                    <span class="detail-value">₹${request.rideCost}</span>
//                </div>
//                ` : ''}
//                <div class="detail-item">
//                    <span class="detail-label">🕐 Requested</span>
//                    <span class="detail-value">${new Date(request.requestedAt).toLocaleString()}</span>
//                </div>
//            </div>
//
//            <!-- Status Messages -->
//            ${request.status === 'PENDING' ? `
//                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f59e0b;">
//                    <p style="color: #92400e; margin: 0; font-weight: 500;">
//                        ⏳ <strong>Waiting for rider approval...</strong>
//                    </p>
//                    <p style="color: #92400e; margin: 5px 0 0 0; font-size: 0.9rem;">
//                        You'll be notified once the rider responds to your request.
//                    </p>
//                </div>
//            ` : ''}
//
//            ${request.status === 'ACCEPTED' ? `
//                <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 12px; margin-top: 15px; border: 2px solid #10b981; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.1);">
//                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
//                        <span style="font-size: 2rem;">🎉</span>
//                        <div>
//                            <p style="color: #065f46; margin: 0; font-weight: 700; font-size: 1.1rem;">
//                                Request Accepted!
//                            </p>
//                            <p style="color: #047857; margin: 3px 0 0 0; font-size: 0.9rem;">
//                                ${request.respondedAt ? `Accepted on ${new Date(request.respondedAt).toLocaleString()}` : ''}
//                            </p>
//                        </div>
//                    </div>
//                    ${request.riderPhone ? `
//                        <div style="background: white; padding: 12px; border-radius: 8px; margin-top: 12px;">
//                            <p style="color: #065f46; margin: 0 0 8px 0; font-weight: 600;">📞 Contact Rider:</p>
//                            <a href="tel:${request.riderPhone}" class="btn btn-primary" style="width: 100%; text-align: center; text-decoration: none; display: block;">
//                                📱 Call ${request.riderName} - ${request.riderPhone}
//                            </a>
//                        </div>
//                    ` : `
//                        <p style="color: #047857; margin: 10px 0 0 0; font-size: 0.9rem;">
//                            The rider will contact you soon at your registered phone number.
//                        </p>
//                    `}
//                </div>
//            ` : ''}
//
//            ${request.status === 'REJECTED' ? `
//                <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ef4444;">
//                    <p style="color: #991b1b; margin: 0; font-weight: 500;">
//                        ❌ <strong>Request Rejected</strong>
//                    </p>
//                    <p style="color: #991b1b; margin: 5px 0 0 0; font-size: 0.9rem;">
//                        Don't worry! Try requesting another ride.
//                    </p>
//                    <a href="/find-ride.html" class="btn btn-primary btn-sm" style="margin-top: 10px; text-decoration: none; display: inline-block;">
//                        🔍 Find Another Ride
//                    </a>
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





//////////// new
const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api';

let currentUser = null;
let refreshInterval = null;

async function init() {
    // Validate session with backend first
    try {
        const res = await fetch(`${API_BASE}/auth/me`, {
            credentials: 'include'
        });

        if (res.ok) {
            currentUser = await res.json();
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            // Session expired
            localStorage.removeItem('user');
            alert('Your session has expired. Please login again.');
            window.location.href = '/login.html';
            return;
        }
    } catch (err) {
        // Fallback to localStorage if network error
        currentUser = JSON.parse(localStorage.getItem('user'));
    }

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

        // Handle session expiration
        if (response.status === 401) {
            localStorage.removeItem('user');
            alert('Your session has expired. Please login again.');
            window.location.href = '/login.html';
            return;
        }

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
    const statusColors = {
        'PENDING': { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: '⏳' },
        'ACCEPTED': { bg: '#d1fae5', border: '#10b981', text: '#065f46', icon: '✅' },
        'REJECTED': { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', icon: '❌' }
    };

    const statusStyle = statusColors[request.status] || statusColors['PENDING'];

    return `
        <div class="ride-card" style="border-left: 4px solid ${statusStyle.border};">
            <div class="ride-header">
                <div class="ride-info">
                    <h3 style="color: #1f2937; margin-bottom: 5px;">
                        🚗 ${request.rideStartLocation || 'College'} → ${request.rideEndLocation || request.passengerDestination}
                    </h3>
                    <p style="color: #6b7280; font-size: 0.9rem; margin: 0;">
                        📅 ${request.rideDate || 'Date N/A'} at ${request.rideTime || 'Time N/A'}
                    </p>
                </div>
                <span class="status-badge" style="background: ${statusStyle.bg}; color: ${statusStyle.text}; border: 2px solid ${statusStyle.border};">
                    ${statusStyle.icon} ${request.status}
                </span>
            </div>

            <!-- Rider Information -->
            ${request.riderName ? `
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 0.95rem;">🏍️ Rider Information</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    <div>
                        <span style="color: #6b7280; font-size: 0.85rem;">Name</span>
                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderName}</p>
                    </div>
                    <div>
                        <span style="color: #6b7280; font-size: 0.85rem;">Vehicle</span>
                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderVehicleModel || 'Two Wheeler'}</p>
                    </div>
                    <div>
                        <span style="color: #6b7280; font-size: 0.85rem;">Vehicle Number</span>
                        <p style="color: #1f2937; margin: 3px 0; font-weight: 600;">${request.riderVehicleNumber || 'N/A'}</p>
                    </div>
                    ${request.status === 'ACCEPTED' && request.riderPhone ? `
                    <div>
                        <span style="color: #6b7280; font-size: 0.85rem;">📞 Contact</span>
                        <p style="color: #059669; margin: 3px 0; font-weight: 600; font-size: 1.1rem;">
                            <a href="tel:${request.riderPhone}" style="color: #059669; text-decoration: none;">${request.riderPhone}</a>
                        </p>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}

            <!-- Trip Details -->
            <div class="ride-details" style="background: #ffffff; padding: 12px; border-radius: 8px; margin-top: 10px;">
                <div class="detail-item">
                    <span class="detail-label">📍 Your Destination</span>
                    <span class="detail-value">${request.passengerDestination}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">💺 Seats</span>
                    <span class="detail-value">${request.seatsRequested}</span>
                </div>
                ${request.rideDistance ? `
                <div class="detail-item">
                    <span class="detail-label">📏 Distance</span>
                    <span class="detail-value">${request.rideDistance} km</span>
                </div>
                ` : ''}
                ${request.rideCost ? `
                <div class="detail-item">
                    <span class="detail-label">💰 Total Cost</span>
                    <span class="detail-value">₹${request.rideCost}</span>
                </div>
                ` : ''}
                <div class="detail-item">
                    <span class="detail-label">🕐 Requested</span>
                    <span class="detail-value">${new Date(request.requestedAt).toLocaleString()}</span>
                </div>
            </div>

            <!-- Status Messages -->
            ${request.status === 'PENDING' ? `
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f59e0b;">
                    <p style="color: #92400e; margin: 0; font-weight: 500;">
                        ⏳ <strong>Waiting for rider approval...</strong>
                    </p>
                    <p style="color: #92400e; margin: 5px 0 0 0; font-size: 0.9rem;">
                        You'll be notified once the rider responds to your request.
                    </p>
                </div>
            ` : ''}

            ${request.status === 'ACCEPTED' ? `
                <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 12px; margin-top: 15px; border: 2px solid #10b981; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.1);">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <span style="font-size: 2rem;">🎉</span>
                        <div>
                            <p style="color: #065f46; margin: 0; font-weight: 700; font-size: 1.1rem;">
                                Request Accepted!
                            </p>
                            <p style="color: #047857; margin: 3px 0 0 0; font-size: 0.9rem;">
                                ${request.respondedAt ? `Accepted on ${new Date(request.respondedAt).toLocaleString()}` : ''}
                            </p>
                        </div>
                    </div>
                    ${request.riderPhone ? `
                        <div style="background: white; padding: 12px; border-radius: 8px; margin-top: 12px;">
                            <p style="color: #065f46; margin: 0 0 8px 0; font-weight: 600;">📞 Contact Rider:</p>
                            <a href="tel:${request.riderPhone}" class="btn btn-primary" style="width: 100%; text-align: center; text-decoration: none; display: block;">
                                📱 Call ${request.riderName} - ${request.riderPhone}
                            </a>
                        </div>
                    ` : `
                        <p style="color: #047857; margin: 10px 0 0 0; font-size: 0.9rem;">
                            The rider will contact you soon at your registered phone number.
                        </p>
                    `}
                </div>
            ` : ''}

            ${request.status === 'REJECTED' ? `
                <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ef4444;">
                    <p style="color: #991b1b; margin: 0; font-weight: 500;">
                        ❌ <strong>Request Rejected</strong>
                    </p>
                    <p style="color: #991b1b; margin: 5px 0 0 0; font-size: 0.9rem;">
                        Don't worry! Try requesting another ride.
                    </p>
                    <a href="/find-ride.html" class="btn btn-primary btn-sm" style="margin-top: 10px; text-decoration: none; display: inline-block;">
                        🔍 Find Another Ride
                    </a>
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