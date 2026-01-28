///////////// new
const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api';

let currentUser = null;
let refreshInterval = null;

async function init() {
    // First, try to get user from backend session (most reliable)
    try {
        const res = await fetch(`${API_BASE}/auth/me`, {
            credentials: 'include'
        });

        if (res.ok) {
            // Session is valid, get user from backend
            currentUser = await res.json();
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            // Session invalid, clear everything
            currentUser = null;
            localStorage.removeItem('user');
        }
    } catch (err) {
        // Network error or backend down, try localStorage as fallback
        console.log('Could not verify session, using localStorage');
        currentUser = JSON.parse(localStorage.getItem('user'));
    }

    // Show greeting if logged in, otherwise show generic message
    if (currentUser) {
        document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;
        // Show logged-in options
        const authLinks = document.querySelector('.auth-links');
        if (authLinks) {
            authLinks.innerHTML = `
                <a href="/my-requests.html">📋 View My Requests</a> |
                ${currentUser.isRider ? '<a href="/rider-dashboard.html">🏍️ My Dashboard</a> | ' : ''}
                <a href="/" onclick="logout(event)">Logout</a>
            `;
        }
    } else {
        document.getElementById('user-greeting').textContent = 'Browse available rides';
        // Show signup option
        const authLinks = document.querySelector('.auth-links');
        if (authLinks) {
            authLinks.innerHTML = `
                Want to request a ride? <a href="/signup.html">Signup/Login</a> |
                <a href="/">Back to Home</a>
            `;
        }
    }

    // Load rides immediately
    await showAllRides();

    // Set up auto-refresh every 30 seconds for browse page
    refreshInterval = setInterval(async () => {
        await showAllRides();
    }, 30000);
}

// Clean up interval when leaving page
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});

async function showAllRides() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('rides-container');

    loading.style.display = 'block';
    container.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE}/rides`, {
            credentials: 'include'
        });
        const rides = await response.json();

        loading.style.display = 'none';

        if (rides.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🚫</div>
                    <h3>No rides available</h3>
                    <p>Check back later or post your own ride!</p>
                </div>
            `;
            return;
        }

        rides.forEach(ride => {
            container.innerHTML += createRideCard(ride);
        });
    } catch (error) {
        loading.style.display = 'none';
        showAlert('Failed to load rides', 'error');
    }
}

const searchInput = document.getElementById("search");

// Enter key search
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchRides();
  }
});

// Auto show all when input is cleared
searchInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    showAllRides();
  }
});

async function searchRides() {
    const destination = document.getElementById('search').value.trim();
    if (!destination) {
        showAllRides();
        return;
    }

    const loading = document.getElementById('loading');
    const container = document.getElementById('rides-container');

    loading.style.display = 'block';
    container.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE}/rides?destination=${encodeURIComponent(destination)}`, {
            credentials: 'include'
        });
        const rides = await response.json();

        loading.style.display = 'none';

        if (rides.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No rides found</h3>
                    <p>Try searching for a different destination</p>
                </div>
            `;
            return;
        }

        rides.forEach(ride => {
            container.innerHTML += createRideCard(ride);
        });
    } catch (error) {
        loading.style.display = 'none';
        showAlert('Search failed', 'error');
    }
}

function createRideCard(ride) {
    return `
        <div class="ride-card">
            <div class="ride-header">
                <div class="ride-info">
                    <h3>${ride.startLocation} → ${ride.endLocation}</h3>
                    <p style="color: #718096; margin: 5px 0;">By ${ride.rider.name}</p>
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
                    <span class="detail-label">💰 Total Cost</span>
                    <span class="detail-value">₹${ride.totalCost}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">💺 Seats</span>
                    <span class="detail-value">${ride.availableSeats} / ${ride.totalSeats}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🏍️ Vehicle</span>
                    <span class="detail-value">${ride.rider.vehicleModel || 'Two Wheeler'}</span>
                </div>
            </div>

            ${ride.status === 'OPEN' && ride.availableSeats > 0 ? `
                <button onclick="requestRide('${ride.id}')" class="btn btn-primary" style="width: 100%; margin-top: 15px;">
                    Request Ride
                </button>
            ` : ''}
        </div>
    `;
}

async function requestRide(rideId) {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please signup/login first to request rides!');
        window.location.href = '/signup.html';
        return;
    }

    const destination = prompt('Where exactly do you want to go?');
    if (!destination) return;

    const seats = parseInt(prompt('How many seats do you need?', '1'));
    if (!seats || seats < 1) return;

    try {
        const response = await fetch(`${API_BASE}/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                rideId: rideId,
                passengerDestination: destination,
                seatsRequested: seats
            })
        });

        // Handle session expiration
        if (response.status === 401) {
            alert('Your session has expired. Please login again.');
            localStorage.removeItem('user');
            window.location.href = '/login.html';
            return;
        }

        const data = await response.json();

        if (response.ok) {
            showAlert('Request sent successfully! Waiting for rider approval.', 'success');
            showAllRides();
        } else {
            showAlert(data.message || 'Request failed', 'error');
        }
    } catch (error) {
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
    window.location.href = '/';
}
// Initialize on page load
init();