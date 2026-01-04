const port =4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jsw =require('jsonwebtoken');
const multer = require ('multer');
const path = require('path');
require("dotenv").config();

app.use(cors());
app.use(express.json()); 


//Database connection with mongodb

mongoose.connect(process.env.MONGO_URL);


app.get('/',(req,res)=>{
    res.send("Express App is Running");
});




//API creation
app.listen(port,(error)=>{
    if(!error){
    console.log(`Server is running on port ${port}`);
    }else{
        console.log("Error occurred, server can't start",error);
    }
});