// DOM Elements
const toggle = document.getElementById('onlineToggle');
const statusLabel = document.getElementById('statusLabel');
const actionStatus = document.getElementById('actionStatus');
const mapContainer = document.getElementById('mapContainer');
const fullscreenIcon = document.getElementById('fullscreenIcon');

const notificationOverlay = document.getElementById('notificationOverlay');
const otpPickupOverlay = document.getElementById('otpPickupOverlay');
const otpDropOverlay = document.getElementById('otpDropOverlay');

let notificationTimer;
let journeyTimer;

// Toggle Online/Offline logic
toggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        statusLabel.innerText = "Online";
        statusLabel.style.color = "var(--primary)";
        actionStatus.innerText = "Waiting for delivery requests...";
        
        // Simulate receiving an order after 2.5 seconds of going online
        notificationTimer = setTimeout(() => {
            notificationOverlay.classList.add('active');
        }, 2500);
    } else {
        statusLabel.innerText = "Offline";
        statusLabel.style.color = "var(--text-main)";
        actionStatus.innerText = "Ready to help? Go online to receive orders.";
        clearTimeout(notificationTimer);
        clearTimeout(journeyTimer);
        closeAllOverlays();
    }
});

// Accept/Decline Logic
function handleDecline() {
    notificationOverlay.classList.remove('active');
    actionStatus.innerText = "Order declined. Waiting for next request...";
    // Re-trigger a mock order for demo purposes
    if(toggle.checked) {
        notificationTimer = setTimeout(() => {
            notificationOverlay.classList.add('active');
        }, 4000);
    }
}

function handleAccept() {
    notificationOverlay.classList.remove('active');
    actionStatus.innerText = "Navigating to Pickup Location...";
    
    // Simulate arriving at pickup after 3 seconds
    journeyTimer = setTimeout(() => {
        actionStatus.innerText = "Arrived at Pickup. Please verify OTP.";
        otpPickupOverlay.classList.add('active');
    }, 3000);
}

// OTP Verification Logic
function verifyPickup() {
    const otp = document.getElementById('pickupOtp').value;
    if(otp.length > 0) { // basic validation for mockup
        otpPickupOverlay.classList.remove('active');
        document.getElementById('pickupOtp').value = '';
        actionStatus.innerText = "Package secured! Navigating to NGO Drop-off...";
        
        // Simulate arriving at NGO after 3 seconds
        journeyTimer = setTimeout(() => {
            actionStatus.innerText = "Arrived at NGO. Please verify drop-off OTP.";
            otpDropOverlay.classList.add('active');
        }, 3000);
    } else {
        alert("Please enter the 4-digit OTP.");
    }
}

function verifyDrop() {
    const otp = document.getElementById('dropOtp').value;
    if(otp.length > 0) {
        otpDropOverlay.classList.remove('active');
        document.getElementById('dropOtp').value = '';
        actionStatus.innerText = "Delivery Complete! Thank you for your service. Waiting for next order...";
        
        // Reset flow for demo
        notificationTimer = setTimeout(() => {
            if(toggle.checked) notificationOverlay.classList.add('active');
        }, 5000);
    } else {
        alert("Please enter the 4-digit OTP.");
    }
}

// Utility: Close all overlays
function closeAllOverlays() {
    notificationOverlay.classList.remove('active');
    otpPickupOverlay.classList.remove('active');
    otpDropOverlay.classList.remove('active');
}

// Map Fullscreen Toggle
function toggleFullscreen() {
    mapContainer.classList.toggle('fullscreen');
    if (mapContainer.classList.contains('fullscreen')) {
        fullscreenIcon.innerText = "fullscreen_exit";
    } else {
        fullscreenIcon.innerText = "fullscreen";
    }
}