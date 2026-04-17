const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const express = require("express");
const multer = require("multer");
const cors = require("cors");   // ✅ ADD THIS

const app = express();

// ✅ ADD THIS JUST AFTER app is created
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
   upload.single("license"), (req, res) => {
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

