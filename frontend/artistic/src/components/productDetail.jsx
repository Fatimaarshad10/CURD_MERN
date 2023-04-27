import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'
import '../css/new.css'

const ProductDetails = () => {
const {id} = useParams(); 
const [detail, setDetail] = useState({
title: "",
description: "",
price: "",
_id: "",
image:''
})

const data = async() => {
    const response = await fetch(`/products/`+ id , {
        method: "GET",
       
      });
      const json = await response.json();
      console.log(json)
      if(response.ok){

        setDetail({
          image:json.image,
          title: json.title,
          description: json.description,
          price: json.price,
          _id: json._id,
        });
      }
      
    }
useEffect(() => {
 data()

},[])
  return (
   <>
  <div class = "card-wrapper">
  <div class = "card">
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          <img src = {detail.image} alt = "shoe image"/>
        </div>
      </div>
    
    </div>
    <div class = "product-content mt-5">
      <h2 class = "product-title mt-5">{detail.title}</h2>
      <div class = "product-rating">
        <i class = "fas fa-star"></i>
        <i class = "fas fa-star"></i>
        <i class = "fas fa-star"></i>
        <i class = "fas fa-star"></i>
        <i class = "fas fa-star-half-alt"></i>
        <span>4.7(21)</span>
      </div>

      <div class = "product-price">
        <p class = "last-price">Old Price: <span>$257.00</span></p>
        <p class = "new-price">New Price: <span>${detail.price}</span></p>
      </div>

      <div class = "product-detail">
        <h2>about this item: </h2>
        <p>{detail.description}</p>
        <ul>
          <li>Color: <span>Black</span></li>
          <li>Available: <span>in stock</span></li>
          <li>Category: <span>Shoes</span></li>
          <li>Shipping Area: <span>All over the world</span></li>
          <li>Shipping Fee: <span>Free</span></li>
        </ul>
      </div>

      <div class = "purchase-info">
        <input type = "number" min = "0" value = "1"/>
        <button type = "button" class = "btn">
          Add to Cart <i class = "fas fa-shopping-cart"></i>
        </button>
        <button type = "button" class = "btn">Compare</button>
      </div>

      <div class = "social-links">
        <p>Share At: </p>
        <a href = "#">
          <i class = "fab fa-facebook-f"></i>
        </a>
        <a href = "#">
          <i class = "fab fa-twitter"></i>
        </a>
        <a href = "#">
          <i class = "fab fa-instagram"></i>
        </a>
        <a href = "#">
          <i class = "fab fa-whatsapp"></i>
        </a>
        <a href = "#">
          <i class = "fab fa-pinterest"></i>
        </a>
      </div>
    </div>
  </div>
</div>
  
   </>
  )
}

export default ProductDetails