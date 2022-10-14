const Product = require("../models/ProductData");
const getProductData = async (req, res) => {
  // method find all products
  const Products = await Product.find({});
  res.status(200).json(Products);
  
};
const addProductData = async (req, res) => {
  //method create
  const producted = new Product({
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    image:`http://localhost:2000/profile/${req.file.filename}`,
  })
  try {
    const Products = await Product.create(producted);
    res.status(200).json(Products);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const updateProductOne = async(req,res)=>{
  const { id } = req.params
  try{
    const products = await Product.findOne({_id:id },{
      ...req.body   
  })
  
  res.status(200).json(products)
  
}
  catch(error){
    res.status(400).send(error.message);

  }
}
const deleteProductData = async (req, res) => {
  // method findByIdAndDelete
  const { id } = req.params;
  try {
    const Products = await Product.findByIdAndDelete({ _id: id });
    res.status(200).json(Products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const updateProductData = async (req, res) => {
  const { id } = req.params; //destructing
 

  // method findByIdAndUpdate
  try {
    const Products = await Product.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      ...(req.file ?  {image:`http://localhost:2000/profile/${req.file.filename}`} : req.body.image),
      },
     
    
       
    );
    res.status(200).json(Products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
module.exports = {
  getProductData,
  addProductData,
  deleteProductData,
  updateProductData,
  updateProductOne
};
