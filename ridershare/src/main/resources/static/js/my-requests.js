//const API_BASE = 'http://localhost:8080/api';
const API_BASE = '/api';
let currentUser = null;
let refreshInterval = null;

async function init() {
    currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
        window.location.href = '/login.html';
        return;
    }
    document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;
    loadMyRequests();
}

async function loadMyRequests() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('requests-container');

    loading.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE}/requests/sent`, {
            credentials: 'include'
        });
        const requests = await response.json();

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
        loading.style.display = 'none';
        showAlert('Failed to load requests', 'error');
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
                ${request.status === 'ACCEPTED' && request.passenger.phone ? `
                <div class="detail-item">
                    <span class="detail-label">📞 Rider Phone</span>
                    <span class="detail-value">${request.passenger.phone}</span>
                </div>
                ` : ''}
            </div>

            ${request.status === 'PENDING' ? `
                <p style="color: #718096; margin-top: 10px;">⏳ Waiting for rider approval...</p>
            ` : ''}

            ${request.status === 'ACCEPTED' ? `
                <div style="background: #c6f6d5; padding: 15px; border-radius: 8px; margin-top: 10px;">
                    <p style="color: #22543d; margin: 0;">✓ Accepted! Contact the rider to coordinate.</p>
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