const form = document.getElementById("donationForm");
const list = document.getElementById("donationsList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const foodName = document.getElementById("foodName").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;
  const expiry = document.getElementById("expiry").value;
  const file = document.getElementById("foodImage").files[0];

  const reader = new FileReader();

  reader.onload = function () {
    const imageURL = reader.result;

    // Create card
    const card = document.createElement("div");
    card.style.width = "250px";
    card.style.borderRadius = "20px";
    card.style.padding = "1rem";
    card.style.background = "#d1e8da";
    card.style.boxShadow = "6px 6px 12px #b5caba, -6px -6px 12px #ffffff";

    card.innerHTML = `
      <img src="${imageURL}" style="width:100%; height:150px; object-fit:cover; border-radius:12px;">
      <h3>${foodName}</h3>
      <p>📍 ${location}</p>
      <p>🍽️ ${quantity}</p>
      <p>⏰ ${new Date(expiry).toLocaleString()}</p>
      <p style="color:green; font-weight:bold;">🟢 Available</p>
    `;

    list.appendChild(card);
  };

  if (file) {
    reader.readAsDataURL(file);
  }

  form.reset();
});