const express = require("express");
// import checking from "../models/checking";
const {
  getProductData,
  addProductData,
  updateProductData,
  deleteProductData,
  updateProductOne,
} = require("../Controllers/ProductControllers");
const multer = require('multer')
const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null, `./images`)
  },
  filename:(req,file,callback)=>{
    console.log(req.file)
    callback(null, file.originalname)
  }
})
const upload = multer({storage:storage})
const Products = express.Router();
// Products.post('/single',upload.single('image'),(req,res)=>{
//   console.log(req.file)
//   res.send('single value ')
// })
//get all the Products
Products.get("/", getProductData);
// add a new Products
Products.post("/",upload.single('image'),addProductData);
// update the all Products
Products.put("/:id",upload.single('image'), updateProductData);
Products.get("/:id", updateProductOne);

// delete the Products
Products.delete("/:id", deleteProductData);
module.exports = Products;
