//const API_BASE = 'http://localhost:8080/api';
const API_BASE = '/api';
let currentUser = null;
let refreshInterval = null;

async function init() {
    currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.isRider) {
        window.location.href = '/find-ride.html';
        return;
    }
    document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;
    loadMyRides();
    loadRequests();
}

async function loadMyRides() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('rides-container');

    loading.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE}/rides/my-rides`, {
            credentials: 'include'
        });
        const rides = await response.json();

        loading.style.display = 'none';

        if (rides.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <h3>No rides posted yet</h3>
                    <p>Click "Post New Ride" to offer a ride!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '<h3 style="margin-bottom: 15px;">📋 Posted Rides</h3>';
        rides.forEach(ride => {
            container.innerHTML += createRideCard(ride);
        });
    } catch (error) {
        console.error('Error loading rides:', error);
        loading.style.display = 'none';
        showAlert('Failed to load rides', 'error');
    }
}

async function loadRequests() {
    try {
        const response = await fetch(`${API_BASE}/requests/received`, {
            credentials: 'include'
        });
        const requests = await response.json();

        if (requests.length > 0) {
            const container = document.getElementById('rides-container');
            container.innerHTML += '<h3 style="margin: 30px 0 15px 0;">📨 Ride Requests</h3>';
            requests.forEach(req => {
                container.innerHTML += createRequestCard(req);
            });
        }
    } catch (error) {
        console.error('Failed to load requests:', error);
    }
}

function createRideCard(ride) {
    return `
        <div class="ride-card">
            <div class="ride-header">
                <div class="ride-info">
                    <h3>${ride.startLocation} → ${ride.endLocation}</h3>
                </div>
                <span class="status-badge status-${ride.status.toLowerCase()}">${ride.status}</span>
            </div>

            <div class="ride-details">
                <div class="detail-item">
                    <span class="detail-label">📅 Date</span>
                    <span class="detail-value">${ride.date}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🕐 Time</span>
                    <span class="detail-value">${ride.time}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">📏 Distance</span>
                    <span class="detail-value">${ride.distanceKm} km</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">💰 Cost</span>
                    <span class="detail-value">₹${ride.totalCost}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">💺 Seats</span>
                    <span class="detail-value">${ride.availableSeats} / ${ride.totalSeats}</span>
                </div>
            </div>

            ${ride.status === 'OPEN' ? `
                <button onclick="completeRide('${ride.id}')" class="btn btn-secondary btn-sm" style="margin-top: 10px;">
                    Mark as Completed
                </button>
            ` : ''}
        </div>
    `;
}

function createRequestCard(request) {
    return `
        <div class="ride-card">
            <div class="ride-header">
                <div class="ride-info">
                    <h3>Request from ${request.passenger.name}</h3>
                    <p style="color: #718096; margin: 5px 0;">Roll: ${request.passenger.rollNumber}</p>
                </div>
                <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span>
            </div>

            <div class="ride-details">
                <div class="detail-item">
                    <span class="detail-label">📍 Going to</span>
                    <span class="detail-value">${request.passengerDestination}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">💺 Seats</span>
                    <span class="detail-value">${request.seatsRequested}</span>
                </div>
                ${request.status === 'ACCEPTED' ? `
                <div class="detail-item">
                    <span class="detail-label">📞 Phone</span>
                    <span class="detail-value">${request.passenger.phone}</span>
                </div>
                ` : ''}
            </div>

            ${request.status === 'PENDING' ? `
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button onclick="acceptRequest('${request.id}')" class="btn btn-primary btn-sm" style="flex: 1;">
                        ✓ Accept
                    </button>
                    <button onclick="rejectRequest('${request.id}')" class="btn btn-danger btn-sm" style="flex: 1;">
                        ✗ Reject
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

async function acceptRequest(requestId) {
    try {
        const response = await fetch(`${API_BASE}/requests/${requestId}/accept`, {
            method: 'PUT',
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Request accepted!', 'success');
            // Reload the page to show updated data
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            showAlert(data.message, 'error');
        }
    } catch (error) {
        console.error('Error accepting request:', error);
        showAlert('Network error', 'error');
    }
}

async function rejectRequest(requestId) {
    if (!confirm('Are you sure you want to reject this request?')) return;

    try {
        const response = await fetch(`${API_BASE}/requests/${requestId}/reject`, {
            method: 'PUT',
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Request rejected', 'info');
            // Reload the page to show updated data
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            showAlert(data.message, 'error');
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        showAlert('Network error', 'error');
    }
}

async function completeRide(rideId) {
    if (!confirm('Mark this ride as completed?')) return;

    try {
        const response = await fetch(`${API_BASE}/rides/${rideId}/status?status=COMPLETED`, {
            method: 'PUT',
            credentials: 'include'
        });

        if (response.ok) {
            showAlert('Ride marked as completed!', 'success');
            setTimeout(() => {
                loadMyRides();
            }, 1000);
        } else {
            showAlert('Failed to update ride status', 'error');
        }
    } catch (error) {
        console.error('Error completing ride:', error);
        showAlert('Network error', 'error');
    }
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