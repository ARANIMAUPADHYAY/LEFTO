const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const express = require("express");
const multer = require("multer");
const cors = require("cors");   

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

let users = [];

// route
app.post("/register",
   upload.single("image"), (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

  const userData = {
    id: Date.now(),
    email: req.body.email,
    role: req.body.role,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    image: req.file ? 
    req.file.filename : null,
    status: "pending"
  };

  users.push(userData);

  console.log("Stored User:", userData);

  res.send("User registered successfully");
} catch (err){
  console.log("ERROR:", err);
  res.status(500).send("Server Error");
}
});
//check route]
app.get("/users", (req, res)=> {
  res.json(users);
})
//API to view stored data
app.get("/users", (req, res) => {
  res.json(users);
});

//View uploaded images
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => console.log("Server running"));

//unique order id generator
let orders = [];
app.post("/create-order", (req, res) => {
  const { foodType, quantity, pickupTime, expiry, pickupLocation, dropLocation } = req.body;
   
  const now = new Date();
   if (new Date(expiry) <= now) {
     return res.status(400).json({
     error: "Expiry time must be in the future"
     });
    }
  const order = {
    id: Date.now(),
    foodType,
    quantity,
    expiry,
    pickupLocation,
    dropLocation,
    pickupOTP: Math.floor(1000 + Math.random() * 9000).toString(),
    dropOTP: Math.floor(1000 + Math.random() * 9000).toString(),
    status: "pending"
  };

  orders.push(order);

  res.json(order);
});

//sends order details to volunteer
app.get("/orders", (req, res) => {
  res.json(orders);
});

// //show OTP on restaurant side
// fetch("http://localhost:3000/create-order", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     foodType,
//     quantity,
//     expiry,
//     pickupLocation,
//     dropLocation
//   })
// })
// .then(res => res.json())
// .then(order => {
//   alert("Pickup OTP: " + order.pickupOTP); // 👈 SHOW THIS
// });

// //fetch order by id
// let currentOrder = null;

// async function loadOrder() {
//   const res = await fetch("http://localhost:3000/orders");
//   const data = await res.json();

//   currentOrder = data[0]; // first order for now

//   if (currentOrder) {
//     document.querySelector("#notificationOverlay .info-row:nth-child(2) span:last-child")
//       .innerText = "Pickup: " + currentOrder.pickupLocation;

//     document.querySelector("#notificationOverlay .info-row:nth-child(3) span:last-child")
//       .innerText = "Drop: " + currentOrder.dropLocation;
//   }
// }
// loadOrder();