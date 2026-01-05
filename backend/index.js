const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());


// ---------------- DB CONNECTION ----------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Express App is Running");
});


// ---------------- FILE UPLOAD SETUP ----------------
const uploadDir = path.join(__dirname, "uploads");
const imageDir = path.join(uploadDir, "images");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imageDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// serve files
app.use("/uploads/images", express.static(imageDir));


// ---------------- PRODUCT MODEL ----------------
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  new_Price: Number,
  old_Price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);


// ---------------- ADD PRODUCT ----------------
app.post("/addproduct", upload.single("product"), async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      category: req.body.category,
      new_Price: req.body.new_Price,
      old_Price: req.body.old_Price,
      image: `http://localhost:${port}/uploads/images/${req.file.filename}`,
    });

    await product.save();
    console.log("Product added:", product);

    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ---------------- REMOVE PRODUCT ----------------
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed:", req.body.id);

  res.json({ success: true });
});


// ---------------- GET ALL PRODUCTS ----------------
app.get("/allproduct", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// ---------------- USER MODEL ----------------
const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: Object,
    date: { type: Date, default: Date.now },
  })
);


// ---------------- SIGNUP ----------------
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});


// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ success: false, errors: "Wrong email" });
  }

  if (req.body.password !== user.password) {
    return res.json({ success: false, errors: "Wrong password" });
  }

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");

  res.json({ success: true, token });
});


// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
