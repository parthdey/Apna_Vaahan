//const API_BASE = 'http://localhost:8080/api';
const API_BASE = '/api';

// Show/hide vehicle details based on rider checkbox
document.getElementById('isRider').addEventListener('change', function(e) {
    const vehicleDetails = document.getElementById('vehicle-details');
    const vehicleNumber = document.getElementById('vehicleNumber');
    const vehicleModel = document.getElementById('vehicleModel');

    if (e.target.checked) {
        vehicleDetails.style.display = 'block';
        vehicleNumber.required = true;
        vehicleModel.required = true;
    } else {
        vehicleDetails.style.display = 'none';
        vehicleNumber.required = false;
        vehicleModel.required = false;
    }
});

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        rollNumber: document.getElementById('rollNumber').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        isRider: document.getElementById('isRider').checked,
        vehicleType: document.getElementById('isRider').checked ? "Two Wheeler" : null,  // ✅ ADDED THIS LINE!
        vehicleNumber: document.getElementById('vehicleNumber').value,
        vehicleModel: document.getElementById('vehicleModel').value
    };

    try {
        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                if (data.rider === true) {
                    window.location.href = '/rider-dashboard.html';
                } else {
                    window.location.href = '/find-ride.html';
                }
            }, 1500);
        } else {
            showAlert(data.message || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Network error. Please check your connection.', 'error');
    }
});

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}