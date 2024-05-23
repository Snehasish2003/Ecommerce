import express from "express";
import cors from "cors";
import pg from "pg";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
    app.use(express.json())
app.use(cors());

const port = 4000;
//Database connection with mongodb 
mongoose.connect("mongodb+srv://subhsne:Guduli%402003@cluster0.5d1bg9f.mongodb.net/e-commerce");


app.get("/", (req, res) => {
    res.send("express app is running");
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage })

//Creating upload endpoint for images
app.use('/images', express.static("upload/images"))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct", async (req, res) => {
    let products= await Product.find({});
    let id;
    if (products.length>0) {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
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
    console.log("saved")
    res.json({
        success: true,
        name: req.body.name,
    })
});
//Deleting products from Database
app.post("/removeproduct",async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })

});
app.get("/allproducts",async(req,res)=>{
    let products=await Product.find({});
    console.log("All products fetch");
    res.send(products);
});

//schema creating for user model

const users=mongoose.model("users",{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }



})

//creating endpoint for registing user

app.post("/signup",async(req,res)=>{
    let check=await users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"existing user found with same email id"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new users({

        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    });
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token =jwt.sign(data,"secret_ecom");
    res.json({success:true,token})
    
})

//user login
app.post("/login",async(req,res)=>{
    let user=await users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data, "secret_ecom")
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"wrong email id"})
    }
})

//creating endpoint for new collection data

app.get("/newcollection",async(req,res)=>{
    let product=await Product.find({});
    let newcollection=product.slice(1).slice(-8);
    console.log("newcollection fetched");
    res.send(newcollection);
})







//Api creation
app.listen(port, () => {
    console.log("server is running on " + port);
});