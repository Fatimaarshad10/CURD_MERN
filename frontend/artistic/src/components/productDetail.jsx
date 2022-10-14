import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'
import { CardText } from 'reactstrap'
import page from '../image/new.png'
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

    <div className="home-container">
        <div className="row">
          <div className="col-md-5">
            <img src={detail.image} className="home-img zoom" alt="logo" />
          </div>
          <div className="col-md-5 header" style={{marginTop:"8%" }}>
            <h1>{detail.title}</h1>

            <CardText>
             {detail.description}
            </CardText>
            
            <CardText>
             Rs{detail.price}
            </CardText>
           </div>
          </div>
        </div>
   </>
  )
}

export default ProductDetails