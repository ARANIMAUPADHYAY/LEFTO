// ---------------- Firebase Setup ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDqlO8xiRy4m0-Y3__eM77j7Biup4cJctw",
  authDomain: "lefto-259a9.firebaseapp.com",
  projectId: "lefto-259a9",
  storageBucket: "lefto-259a9.firebasestorage.app",
  messagingSenderId: "369693551767",
  appId: "1:369693551767:web:5542cd993de6a8ec77cdd2",
  measurementId: "G-79MVE0ZJ26"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
let selectedRole = null;

// ---------------- Role Selection ----------------
function handleRoleSelection(role, formId) {
  selectedRole = role;
  loginWithGoogle(formId);
}

// ---------------- Firebase Login ----------------
function loginWithGoogle(formId) {
  signInWithPopup(auth, provider)
    .then((result) => {
      currentUser = result.user;

      console.log("Logged in:", currentUser.email);
      console.log("Role:", selectedRole);

      showForm(formId);
    })
    .catch((error) => {
      console.log(error);
    });
}

// ---------------- Show Forms ----------------
function showForm(formId) {
  document.getElementById('role-selection').classList.add('hidden');

  document.getElementById('ngo-form').classList.add('hidden');
  document.getElementById('restaurant-form').classList.add('hidden');
  document.getElementById('volunteer-form').classList.add('hidden');

  document.getElementById(formId).classList.remove('hidden');
}

function showSelection() {
  document.getElementById('ngo-form').classList.add('hidden');
  document.getElementById('restaurant-form').classList.add('hidden');
  document.getElementById('volunteer-form').classList.add('hidden');

  document.getElementById('role-selection').classList.remove('hidden');
}

// ---------------- Submit Functions ----------------
function submitRestaurant(event) {
  event.preventDefault();

  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const formData = new FormData();

  formData.append("email", currentUser.email);
  formData.append("role", selectedRole);
  formData.append("name", event.target[0].value);
  formData.append("address", event.target[1].value);
  formData.append("phone", event.target[2].value);

  // 👇 image file
  formData.append("image", event.target[3].files[0]);

  fetch("http://localhost:3000/register", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("Server response:", data);
    alert("Submitted successfully!");
  })
  .catch(err => console.log(err));
}

function submitNGO(event) {
  event.preventDefault();

  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const formData = new FormData();

  formData.append("email", currentUser.email);
  formData.append("role", selectedRole);
  formData.append("name", event.target[0].value);
  formData.append("address", event.target[1].value);
  formData.append("phone", event.target[2].value);

  // 👇 image
  formData.append("image", event.target[3].files[0]);

  fetch("http://localhost:3000/register", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("NGO response:", data);
    alert("NGO submitted successfully!");
  })
  .catch(err => console.log(err));
}

function submitVolunteer(event) {
  event.preventDefault();

  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const formData = new FormData();

  formData.append("email", currentUser.email);
  formData.append("role", selectedRole);
  formData.append("name", event.target[0].value);
  formData.append("phone", event.target[1].value);

  // 👇 multiple files
  formData.append("driverImage", event.target[2].files[0]);
  formData.append("license", event.target[3].files[0]);
  formData.append("vehicleType", event.target[4].value);
  formData.append("capacity", event.target[5].value);
  formData.append("vehicleImage", event.target[6].files[0]);

  fetch("http://localhost:3000/register", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("Volunteer response:", data);
    alert("Volunteer submitted successfully!");
  })
  .catch(err => console.log(err));
}

window.handleRoleSelection = handleRoleSelection;
window.showForm = showForm;
window.showSelection = showSelection;
window.submitRestaurant = submitRestaurant;
window.submitNGO = submitNGO;
window.submitVolunteer = submitVolunteer;