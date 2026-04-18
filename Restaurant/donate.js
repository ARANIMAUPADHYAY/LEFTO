const form = document.getElementById("donationForm");
//const list = document.getElementById("donationsList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const foodName = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;
  const expiry = document.getElementById("pickupTime").value;
  const file = document.getElementById("foodImage").files[0];
  
  // 🔐 Generate OTP
  const otp = "6598"; // SAME as volunteer
  document.getElementById("otp").innerText = otp;
  document.getElementById("otpBox").classList.remove("hidden");

  form.reset();
});

