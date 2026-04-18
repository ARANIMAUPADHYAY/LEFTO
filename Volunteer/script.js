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

const DUMMY_PICKUP_OTP = "6598";
const DUMMY_DROP_OTP = "5768";

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

    if (otp === DUMMY_PICKUP_OTP) {
        otpPickupOverlay.classList.remove('active');
        document.getElementById('pickupOtp').value = '';

        actionStatus.innerText = "Package secured! Navigating to NGO...";

        journeyTimer = setTimeout(() => {
            actionStatus.innerText = "Arrived at NGO. Please verify drop OTP.";
            otpDropOverlay.classList.add('active');
        }, 3000);

    } else {
        alert("❌ Wrong OTP");
    }
}

function verifyDrop() {
    const otp = document.getElementById('dropOtp').value;

    if (otp === DUMMY_DROP_OTP) {
        otpDropOverlay.classList.remove('active');
        document.getElementById('dropOtp').value = '';

        actionStatus.innerText = "Delivery Complete!";

    } else {
        alert("❌ Wrong OTP");
    }
}

// Utility: Close all overlays
function closeAllOverlays() {
    notificationOverlay.classList.remove('active');
    otpPickupOverlay.classList.remove('active');
    otpDropOverlay.classList.remove('active');
}

//dummy restaurant data
const dummyFoodPosts = [
  {
    id: 1,
    foodType: "Pizza",
    quantity: 20,
    location: "Bhopal Railway Station",
    expiry: "2026-04-18T22:00"
  },
  {
    id: 2,
    foodType: "Rice & Curry",
    quantity: 50,
    location: "MP Nagar Bhopal",
    expiry: "2026-04-18T21:30"
  }
];

// Map Fullscreen Toggle
function toggleFullscreen() {
    mapContainer.classList.toggle('fullscreen');
    if (mapContainer.classList.contains('fullscreen')) {
        fullscreenIcon.innerText = "fullscreen_exit";
    } else {
        fullscreenIcon.innerText = "fullscreen";
    }
}

async function displayOnMap(posts) {
  for (let post of posts) {
    const coords = await getCoordinates(post.location);

    L.marker(coords)
      .addTo(map)
      .bindPopup(`${post.foodType} - ${post.quantity}`);
  }
}

async function loadFoodPosts() {
  try {
    const res = await fetch("http://localhost:3000/food-posts");
    const posts = await res.json();

    if (posts.length === 0) throw "No backend data";

    displayOnMap(posts); // real data
  } catch (err) {
    console.log("Using dummy data");
    displayOnMap(dummyFoodPosts); // fallback
  }
}

initMap();
getVolunteerLocation();
loadFoodPosts();
