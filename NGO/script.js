const toggle = document.getElementById('requestToggle');
const statusLabel = document.getElementById('statusLabel');
const actionStatus = document.getElementById('actionStatus');
const editDetailsLink = document.getElementById('editDetailsLink');
const mapContainer = document.getElementById('mapContainer');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const mainViewContainer = document.getElementById('mainViewContainer');

const popupOverlay = document.getElementById('popupOverlay');
const closePopupBtn = document.getElementById('closePopupBtn');
const packageDistanceText = document.getElementById('packageDistance');
const packageDetailsText = document.getElementById('packageDetailsText');
const driverOtpPanel = document.getElementById('driverOtpPanel');
const generatedOtpText = document.getElementById('generatedOtp');

let isEditing = false;
let setQuantity = "";
let setUnit = "";
let trackingInterval;

// Toggle logic
toggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        if(mainViewContainer.classList.contains('visible')) {
            statusLabel.innerText = "Online";
            statusLabel.style.color = "var(--primary)";
            actionStatus.innerText = "Food supply request is active.";
        } else {
            isEditing = false;
            document.getElementById('foodQuantity').value = '';
            popupOverlay.classList.add('active');
            statusLabel.innerText = "Online";
            statusLabel.style.color = "var(--primary)";
            actionStatus.innerText = "Setting up food request...";
        }
    } else {
        statusLabel.innerText = "Offline";
        statusLabel.style.color = "var(--text-main)";
        actionStatus.innerText = "Ready to receive? Go online to request food.";
    }
});

// Close Popup Logic (Red Cross Button)
closePopupBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    
    if (!isEditing && !mainViewContainer.classList.contains('visible')) {
        toggle.checked = false;
        statusLabel.innerText = "Offline";
        statusLabel.style.color = "var(--text-main)";
        actionStatus.innerText = "Request cancelled.";
    }
});

// Submit Requirement Flow
function submitRequirement() {
    setQuantity = document.getElementById('foodQuantity').value;
    setUnit = document.getElementById('foodUnit').value;

    if (setQuantity === "") {
        alert("Please specify food quantity.");
        return;
    }

    if(isEditing) {
        popupOverlay.classList.remove('active');
        packageDetailsText.innerText = `Requesting: ${setQuantity} ${setUnit}`;
        isEditing = false;
        return;
    }

    // First time submission
    popupOverlay.classList.remove('active');
    mainViewContainer.classList.add('visible');
    editDetailsLink.classList.add('active'); 
    
    packageDetailsText.innerText = `Requesting: ${setQuantity} ${setUnit}`;
    actionStatus.innerText = "Request sent. Generating PIN and assigning driver...";
    
    // Generate Long-lasting OTP after submission
    generateDriverOTP();
    driverOtpPanel.style.display = "flex"; 
    
    setTimeout(() => {
        actionStatus.innerText = "Driver assigned! Food is on the way.";
        startMockTracking();
    }, 2000);
}

// Generate the Long-Lasting OTP for the Driver
function generateDriverOTP() {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    generatedOtpText.innerText = randomOtp;
}

// Edit details link logic
editDetailsLink.addEventListener('click', (e) => {
    e.preventDefault();
    isEditing = true;
    popupOverlay.classList.add('active');
});

// Mock tracking logic
function startMockTracking() {
    packageDistanceText.innerText = "Distance: 2.1 km";
    clearInterval(trackingInterval);
    let distance = 2.1;
    trackingInterval = setInterval(() => {
        if(distance > 0.05) {
            distance -= 0.05;
            packageDistanceText.innerText = `Distance: ${distance.toFixed(2)} km`;
        } else {
            packageDistanceText.innerText = "Distance: Driver is at location! Please provide PIN.";
            clearInterval(trackingInterval);
        }
    }, 1000);
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