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
//const API_BASE =
//  window.location.hostname === 'localhost'
//    ? 'http://localhost:8080/api'
//    : '/api';
//
//let currentUser = null;
//let refreshInterval = null;
//
//async function init() {
//    // Validate session with backend first
//    try {
//        const res = await fetch(`${API_BASE}/auth/me`, {
//            credentials: 'include'
//        });
//
//        if (res.ok) {
//            currentUser = await res.json();
//            localStorage.setItem('user', JSON.stringify(currentUser));
//        } else {
//            // Session expired
//            localStorage.removeItem('user');
//            alert('Your session has expired. Please login again.');
//            window.location.href = '/login.html';
//            return;
//        }
//    } catch (err) {
//        // Fallback to localStorage if network error
//        currentUser = JSON.parse(localStorage.getItem('user'));
//    }
//
//    if (!currentUser) {
//        window.location.href = '/login.html';
//        return;
//    }
//
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
//        // Handle session expiration
//        if (response.status === 401) {
//            localStorage.removeItem('user');
//            alert('Your session has expired. Please login again.');
//            window.location.href = '/login.html';
//            return;
//        }
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





/////////////// new 2.o
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

    // Set up auto-refresh every 30 seconds
    refreshInterval = setInterval(async () => {
        await loadMyRequests();
    }, 30000);
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
                <div class="empty-state" style="
                    text-align: center;
                    padding: 80px 20px;
                    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
                    border-radius: 24px;
                    border: 2px dashed #cbd5e1;
                    animation: fadeIn 0.6s ease-out;
                ">
                    <div style="
                        font-size: 120px;
                        margin-bottom: 20px;
                        animation: float 3s ease-in-out infinite;
                    ">📭</div>
                    <h3 style="
                        color: #1f2937;
                        font-size: 2rem;
                        margin: 0 0 15px 0;
                        font-weight: 800;
                    ">No Requests Yet</h3>
                    <p style="
                        color: #6b7280;
                        font-size: 1.1rem;
                        margin: 0 0 30px 0;
                        max-width: 400px;
                        margin-left: auto;
                        margin-right: auto;
                        line-height: 1.6;
                    ">Start your journey by searching for available rides and sending your first request!</p>
                    <a href="/find-ride.html" class="btn btn-primary" style="
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 16px 32px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        text-decoration: none;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 15px 35px rgba(102, 126, 234, 0.5)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 10px 25px rgba(102, 126, 234, 0.4)'">
                        🔍 Search for Rides
                    </a>
                </div>
                <style>
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                </style>
            `;
            return;
        }

        container.innerHTML = '';
        requests.forEach((req, index) => {
            setTimeout(() => {
                container.innerHTML += createRequestCard(req, index);
            }, index * 100);
        });
    } catch (error) {
        console.error('Error loading requests:', error);
        loading.style.display = 'none';

        // Show more detailed error message
        container.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                border: 2px solid #ef4444;
                border-radius: 16px;
                padding: 30px;
                box-shadow: 0 8px 24px rgba(239, 68, 68, 0.2);
                animation: shake 0.5s ease-in-out;
            ">
                <div style="display: flex; align-items: start; gap: 15px;">
                    <div style="
                        background: white;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                        flex-shrink: 0;
                    ">⚠️</div>
                    <div style="flex: 1;">
                        <strong style="color: #991b1b; font-size: 1.2rem; display: block; margin-bottom: 10px;">
                            Failed to Load Requests
                        </strong>
                        <p style="color: #b91c1c; margin: 0 0 15px 0; line-height: 1.6;">
                            ${error.message}
                        </p>
                        <small style="color: #dc2626; display: block; margin-bottom: 20px;">
                            Please try logging out and logging back in.
                        </small>
                        <button onclick="loadMyRequests()" class="btn btn-primary" style="
                            padding: 12px 24px;
                            font-weight: 600;
                            border-radius: 8px;
                            cursor: pointer;
                        ">
                            🔄 Try Again
                        </button>
                    </div>
                </div>
            </div>
            <style>
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            </style>
        `;
    }
}

function createRequestCard(request, index = 0) {
    const statusColors = {
        'PENDING': {
            bg: '#fef3c7',
            border: '#f59e0b',
            text: '#92400e',
            icon: '⏳',
            gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            shadow: 'rgba(245, 158, 11, 0.2)'
        },
        'ACCEPTED': {
            bg: '#d1fae5',
            border: '#10b981',
            text: '#065f46',
            icon: '✅',
            gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            shadow: 'rgba(16, 185, 129, 0.2)'
        },
        'REJECTED': {
            bg: '#fee2e2',
            border: '#ef4444',
            text: '#991b1b',
            icon: '❌',
            gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            shadow: 'rgba(239, 68, 68, 0.2)'
        }
    };

    const statusStyle = statusColors[request.status] || statusColors['PENDING'];

    return `
        <div class="ride-card request-card" style="
            border-left: 6px solid ${statusStyle.border};
            animation: slideInUp 0.5s ease-out ${index * 0.1}s both;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 20px ${statusStyle.shadow}, 0 0 0 1px rgba(0,0,0,0.05);
            position: relative;
        " onmouseenter="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 40px ${statusStyle.shadow}, 0 0 0 1px rgba(0,0,0,0.08)'" onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px ${statusStyle.shadow}, 0 0 0 1px rgba(0,0,0,0.05)'">

            <!-- Decorative Top Gradient Bar -->
            <div style="
                height: 4px;
                background: ${statusStyle.gradient};
            "></div>

            <!-- Header Section -->
            <div class="ride-header" style="
                padding: 28px 28px 24px 28px;
                border-bottom: 2px solid #f3f4f6;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            ">
                <div class="ride-info" style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <div style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            width: 48px;
                            height: 48px;
                            border-radius: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.6rem;
                            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                        ">🚗</div>
                        <h3 style="
                            color: #1f2937;
                            margin: 0;
                            font-size: 1.4rem;
                            font-weight: 800;
                            line-height: 1.3;
                            letter-spacing: -0.5px;
                        ">
                            ${request.rideStartLocation || 'College'} → ${request.rideEndLocation || request.passengerDestination}
                        </h3>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 14px;">
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 7px;
                            background: #f9fafb;
                            padding: 8px 14px;
                            border-radius: 10px;
                            border: 1px solid #e5e7eb;
                        ">
                            <span style="font-size: 1.2rem;">📅</span>
                            <span style="color: #374151; font-size: 0.95rem; font-weight: 600;">
                                ${request.rideDate || 'Date N/A'}
                            </span>
                        </div>
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 7px;
                            background: #f9fafb;
                            padding: 8px 14px;
                            border-radius: 10px;
                            border: 1px solid #e5e7eb;
                        ">
                            <span style="font-size: 1.2rem;">🕐</span>
                            <span style="color: #374151; font-size: 0.95rem; font-weight: 600;">
                                ${request.rideTime || 'Time N/A'}
                            </span>
                        </div>
                    </div>
                </div>
                <span class="status-badge" style="
                        background: ${statusStyle.gradient};
                        color: ${statusStyle.text};
                        border: 2px solid ${statusStyle.border};
                        padding: 12px 24px;
                        border-radius: 30px;
                        font-weight: 800;
                        font-size: 0.95rem;
                        white-space: nowrap;
                        box-shadow: 0 4px 12px ${statusStyle.shadow};
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-top: 40px;
                    ">
                        ${statusStyle.icon} ${request.status}
                    </span>
            </div>

            <div style="padding: 28px;">
                <!-- Rider Information Section -->
                ${request.riderName ? `
                <div style="
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    padding: 24px;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    border: 2px solid #e2e8f0;
                    box-shadow: inset 0 2px 8px rgba(0,0,0,0.04);
                ">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
                        <div style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            width: 40px;
                            height: 40px;
                            border-radius: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.3rem;
                            box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
                        ">🏍️</div>
                        <h4 style="color: #1e293b; margin: 0; font-size: 1.1rem; font-weight: 800; letter-spacing: -0.3px;">
                            Rider Information
                        </h4>
                    </div>
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                        gap: 14px;
                    ">
                        <div style="
                            background: white;
                            padding: 16px;
                            border-radius: 12px;
                            border-left: 4px solid #667eea;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                            transition: all 0.3s ease;
                        " onmouseenter="this.style.transform='translateX(4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='translateX(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'">
                            <span style="color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                                Rider Name
                            </span>
                            <p style="color: #1e293b; margin: 6px 0 0 0; font-weight: 800; font-size: 1.1rem;">
                                ${request.riderName}
                            </p>
                        </div>
                        <div style="
                            background: white;
                            padding: 16px;
                            border-radius: 12px;
                            border-left: 4px solid #10b981;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                            transition: all 0.3s ease;
                        " onmouseenter="this.style.transform='translateX(4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='translateX(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'">
                            <span style="color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                                Vehicle Model
                            </span>
                            <p style="color: #1e293b; margin: 6px 0 0 0; font-weight: 800; font-size: 1.1rem;">
                                ${request.riderVehicleModel || 'Two Wheeler'}
                            </p>
                        </div>
                        <div style="
                            background: white;
                            padding: 16px;
                            border-radius: 12px;
                            border-left: 4px solid #f59e0b;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                            transition: all 0.3s ease;
                        " onmouseenter="this.style.transform='translateX(4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='translateX(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'">
                            <span style="color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                                Vehicle Number
                            </span>
                            <p style="color: #1e293b; margin: 6px 0 0 0; font-weight: 800; font-size: 1.1rem;">
                                ${request.riderVehicleNumber || 'N/A'}
                            </p>
                        </div>
                        ${request.status === 'ACCEPTED' && request.riderPhone ? `
                        <div style="
                            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                            padding: 16px;
                            border-radius: 12px;
                            border: 2px solid #10b981;
                            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
                            animation: pulse 2s ease-in-out infinite;
                        ">
                            <span style="color: #047857; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                📞 Contact Number
                            </span>
                            <p style="margin: 6px 0 0 0;">
                                <a href="tel:${request.riderPhone}" style="
                                    color: #059669;
                                    text-decoration: none;
                                    font-weight: 800;
                                    font-size: 1.15rem;
                                    display: block;
                                    transition: all 0.2s ease;
                                " onmouseenter="this.style.color='#047857'; this.style.textDecoration='underline'" onmouseleave="this.style.color='#059669'; this.style.textDecoration='none'">
                                    ${request.riderPhone}
                                </a>
                            </p>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Trip Details Section -->
                <div style="
                    background: linear-gradient(to bottom right, #ffffff 0%, #f9fafb 100%);
                    padding: 22px;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    border: 2px solid #e5e7eb;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                ">
                    <h4 style="
                        color: #1e293b;
                        margin: 0 0 18px 0;
                        font-size: 1rem;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span style="font-size: 1.3rem;">📋</span> Trip Details
                    </h4>
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                        gap: 14px;
                    ">
                        <div style="
                            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                            padding: 14px;
                            border-radius: 10px;
                            border: 1px solid #fbbf24;
                        ">
                            <span style="color: #78350f; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                📍 Your Destination
                            </span>
                            <span style="color: #78350f; font-weight: 800; font-size: 1.05rem; margin-top: 6px; display: block;">
                                ${request.passengerDestination}
                            </span>
                        </div>
                        <div style="
                            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                            padding: 14px;
                            border-radius: 10px;
                            border: 1px solid #3b82f6;
                        ">
                            <span style="color: #1e3a8a; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                💺 Seats Needed
                            </span>
                            <span style="color: #1e3a8a; font-weight: 800; font-size: 1.05rem; margin-top: 6px; display: block;">
                                ${request.seatsRequested}
                            </span>
                        </div>
                        ${request.rideDistance ? `
                        <div style="
                            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
                            padding: 14px;
                            border-radius: 10px;
                            border: 1px solid #6366f1;
                        ">
                            <span style="color: #312e81; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                📏 Distance
                            </span>
                            <span style="color: #312e81; font-weight: 800; font-size: 1.05rem; margin-top: 6px; display: block;">
                                ${request.rideDistance} km
                            </span>
                        </div>
                        ` : ''}
                        ${request.rideCost ? `
                        <div style="
                            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                            padding: 14px;
                            border-radius: 10px;
                            border: 2px solid #10b981;
                        ">
                            <span style="color: #064e3b; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                💰 Total Cost
                            </span>
                            <span style="color: #064e3b; font-weight: 900; font-size: 1.2rem; margin-top: 6px; display: block;">
                                ₹${request.rideCost}
                            </span>
                        </div>
                        ` : ''}
                        <div style="
                            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                            padding: 14px;
                            border-radius: 10px;
                            border: 1px solid #d1d5db;
                        ">
                            <span style="color: #374151; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                                🕐 Requested On
                            </span>
                            <span style="color: #1f2937; font-weight: 700; font-size: 0.9rem; margin-top: 6px; display: block;">
                                ${new Date(request.requestedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Status Messages -->
                ${request.status === 'PENDING' ? `
                    <div style="
                        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                        padding: 24px;
                        border-radius: 16px;
                        border: 3px solid #f59e0b;
                        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.2);
                        animation: pulse 2s ease-in-out infinite;
                        position: relative;
                        overflow: hidden;
                    ">
                        <div style="
                            position: absolute;
                            top: -30px;
                            right: -30px;
                            font-size: 100px;
                            opacity: 0.1;
                        ">⏳</div>
                        <div style="display: flex; align-items: start; gap: 15px; position: relative; z-index: 1;">
                            <div style="
                                background: white;
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.8rem;
                                flex-shrink: 0;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                            ">⏳</div>
                            <div style="flex: 1;">
                                <p style="color: #78350f; margin: 0 0 8px 0; font-weight: 800; font-size: 1.15rem; letter-spacing: -0.3px;">
                                    Waiting for Rider Approval
                                </p>
                                <p style="color: #92400e; margin: 0; font-size: 1rem; line-height: 1.6; font-weight: 500;">
                                    Your request has been sent successfully. The rider will review it and respond soon. Please check back later or wait for a notification.
                                </p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${request.status === 'ACCEPTED' ? `
                    <div style="
                        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                        padding: 28px;
                        border-radius: 20px;
                        border: 3px solid #10b981;
                        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                        position: relative;
                        overflow: hidden;
                    ">
                        <div style="
                            position: absolute;
                            top: -60px;
                            right: -60px;
                            font-size: 180px;
                            opacity: 0.1;
                            animation: rotate 20s linear infinite;
                        ">🎉</div>
                        <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 18px; position: relative; z-index: 1;">
                            <div style="
                                background: white;
                                width: 70px;
                                height: 70px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 2.5rem;
                                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                                animation: bounce 2s ease-in-out infinite;
                            ">🎉</div>
                        <div style="flex: 1;">
                            <p style="color: #065f46; margin: 0; font-weight: 800; font-size: 1.3rem; letter-spacing: -0.5px;">
                                Request Accepted!
                            </p>
                            <p style="color: #047857; margin: 5px 0 0 0; font-size: 0.9rem; font-weight: 500;">
                                ${request.respondedAt ? `Accepted on ${new Date(request.respondedAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}` : 'Just now!'}
                            </p>
                        </div>
                    </div>
                    ${request.riderPhone ? `
                        <div style="
                            background: white;
                            padding: 18px;
                            border-radius: 12px;
                            margin-top: 18px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                            position: relative;
                            z-index: 1;
                        ">
                            <p style="color: #065f46; margin: 0 0 12px 0; font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.3rem;">📞</span> Contact Rider Now
                            </p>
                            <a href="tel:${request.riderPhone}" class="btn btn-primary" style="
                                width: 100%;
                                text-align: center;
                                text-decoration: none;
                                display: block;
                                padding: 15px;
                                font-size: 1.1rem;
                                font-weight: 700;
                                border-radius: 10px;
                                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                                transition: all 0.2s ease;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(102, 126, 234, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.3)'">
                                📱 Call ${request.riderName} - ${request.riderPhone}
                            </a>
                        </div>
                    ` : `
                        <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 10px; margin-top: 15px; position: relative; z-index: 1;">
                            <p style="color: #047857; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                                The rider will contact you soon at your registered phone number. Please keep your phone accessible!
                            </p>
                        </div>
                    `}
                </div>
            ` : ''}

            ${request.status === 'REJECTED' ? `
                <div style="
                    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                    padding: 20px;
                    border-radius: 12px;
                    border: 2px solid #ef4444;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
                ">
                    <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 15px;">
                        <span style="font-size: 2rem;">❌</span>
                        <div style="flex: 1;">
                            <p style="color: #991b1b; margin: 0; font-weight: 700; font-size: 1.05rem;">
                                Request Rejected
                            </p>
                            <p style="color: #b91c1c; margin: 8px 0 0 0; font-size: 0.95rem; line-height: 1.5;">
                                Unfortunately, this ride request wasn't accepted. Don't worry, there are plenty of other rides available!
                            </p>
                        </div>
                    </div>
                    <a href="/find-ride.html" class="btn btn-primary btn-sm" style="
                        margin-top: 10px;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 12px 20px;
                        font-weight: 600;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                    ">
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