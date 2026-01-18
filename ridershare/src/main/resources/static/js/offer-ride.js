const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api';

// Auto-calculate cost on distance change
document.getElementById('distanceKm').addEventListener('input', function(e) {
    const distance = parseInt(e.target.value) || 0;
    const costPerKm = 5;
    const total = distance * costPerKm;

    if (distance > 0) {
        document.getElementById('cost-preview').style.display = 'block';
        document.getElementById('preview-distance').textContent = distance;
        document.getElementById('preview-total').textContent = total;
    } else {
        document.getElementById('cost-preview').style.display = 'none';
    }
});

// Set min date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

// Handle form submission
document.getElementById('ride-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        endLocation: document.getElementById('endLocation').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        distanceKm: parseInt(document.getElementById('distanceKm').value),
        availableSeats: parseInt(document.getElementById('availableSeats').value)
    };

    try {
        const response = await fetch(`${API_BASE}/rides`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Ride posted successfully!', 'success');
            setTimeout(() => {
                window.location.href = '/rider-dashboard.html';
            }, 1500);
        } else {
            showAlert(data.message || 'Failed to post ride', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Network error. Please try again.', 'error');
    }
});

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}