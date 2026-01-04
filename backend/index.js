const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// ------------------- DB CONNECTION -------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ------------------- CREATE UPLOAD FOLDERS -------------------
const uploadDir = path.join(__dirname, "uploads");
const imageDir = path.join(uploadDir, "images");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

// ------------------- MULTER -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imageDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Serve images
app.use("/images", express.static(imageDir));

// ------------------- UPLOAD API -------------------
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: 0, message: "File not received by server" });
  }

  return res.json({
    success: 1,
    imageUrl: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// ------------------- PRODUCT SCHEMA -------------------
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// ------------------- ADD PRODUCT API -------------------
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }

  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log(product);

    await product.save();

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with adding product", error: err.message });
  }
});


//creating a api for removin a product

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log(" product was Removed");
    res.json({
        success:true,
        name:req.body.name
    })


})


//Creatign a api for getting all the products

app.get('/allproduct',async(req,res)=>{
    let products= await Product.find({});
    console.log("all products fetched");
    res.send(products)

})


// ------------------- START SERVER -------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
