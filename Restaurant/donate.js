form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const foodType = document.getElementById("foodType").value;
  const quantity = document.getElementById("quantity").value;
  const pickupTime = document.getElementById("pickupTime").value;
  const expiry = document.getElementById("expiryTime").value;

  const res = await fetch("http://localhost:3000/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      foodType,
      quantity,
      pickupTime,
      expiry,
      pickupLocation: "Restaurant Location",
      dropLocation: "NGO Location"
    })
  });

  const order = await res.json();

  document.getElementById("otp").innerText = order.pickupOTP;
  document.getElementById("otpBox").classList.remove("hidden");

  form.reset();
});