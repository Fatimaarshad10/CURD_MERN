import React, { useState, useEffect } from "react";
// import AddProduct from "./AddProduct";
import "../css/artistic.css";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Navigate, useParams} from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  Modal,
  ModalFooter,
  Label,
  Input,
  Form ,FormGroup
} from "reactstrap";
import {toast,ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Products(args) {
  const user1 = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined);
  const [value1, setValue] = useState([]);
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [modalRight, setModalRight] = useState(false);
  const [loader, setLoader] = useState(false);
  const [image1, setImage] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle1 = () => setModal(!modal);

const {id} = useParams()
const forLoader = async () => {
  const response = await fetch("/products", {
    method: "GET",
  });
  const data = await response.json();

  setProducts(data);
  if (response.ok) {
    setLoader(true);
console.log(data)
  }

};
//get all the products
useEffect(() => {
  forLoader()
 
}, []);

  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    _id: "",
    image: ''
  });

  const admin =  JSON.parse(localStorage.getItem("admin"))
  if(admin === "true"){
    var  admit = (admin)
  }else{
    var  admit = ''
  }
  //for delete product
  const deleteProduct = async (_id) => {
    const res = await fetch(`/products/${_id}`, {
      method: "DELETE",
    });
    const p = await res.json();
    console.log(p);
 
    setProducts(products.filter((i) => i.id !== _id));
    if(res.ok){
      toast('User is delete ')
  forLoader()

    }
  };
  
  //Get one product
  const checkProducts = async (_id) => {
    setToggle(!toggle);
    setModalRight(true);
    const response = await fetch(`/products/${_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json)
    console.log(json.image)
    setData({
      json,
      title: json.title,
      description: json.description,
      price: json.price,
      _id: json._id,
    });
    setImage(json.image)
    console.log(image1)
  };

  //update the products
  const UpdateProducts = async (_id) => {
    const data1 = new FormData()
    data1.append('image', image1)
    data1.append('title', data.title)     
    data1.append('description',data.description)
    data1.append('price',data.price)   
    const response = await fetch(`/products/${_id}`, {
      method: "PUT",
      body: data1
    });
    const json = await response.json();
    // console.log(json);
    setImage(json)
    console.log(image1)
    if (response.ok) {
    toast('Product is updated')
      setModalRight(false);


  forLoader()

    }
    
     
  };
 
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const submitHandler =(e)=>{
   
      setImage(e.target.files[0])
      forLoader()
    
    

  }
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    const data = new FormData()
    data.append('image',value1)
    data.append('title', title)     
    data.append('description',description)
    data.append('price',price)    
    const response = await fetch(`/products`, {
      method: "POST",
      body: (data),

    });
    const value = await response.json();
    
    if(!response.ok){
      console.log('error')
      console.log(value)
    }
 else{
      setTitle("")
      setDescription("")
      setPrice("")
      console.log("New Product added:", value);
  forLoader()
  setModal(false);
  toast('Product is added')


    }


  };

  
  const Handler =(e)=>{
    setValue(e.target.files[0])
  }
  return (
    <>
      {toggle ? (
        <Card className="mb-6">
          <Modal
            isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right"
          >
            <div className="App2">
              <h2>UPDATE PRODUCT</h2>
              <div>
                <Label>Title</Label>
                <Input
                  name="title"
                  type="text"
                  value={data.title}
                  onChange={handleInputs}
                />
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={data.price}
                  onChange={handleInputs}

                />
               
              <Input

              type="file"
              files={data.image}
              defaultValue={data.image}
              title={image1}
           
              name="selected-file"
              onChange={submitHandler}
             style={{marginTop:'15px'}}
            />
           <img src={image1}  width='50px' height='50px'alt='There is no image'/>
         
           <Input
           type="text"
           value={image1}
           onChange={handleInputs}
           
           />
                <Label>Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  value={data.description}
                  onChange={handleInputs}
                />

              </div>


              <ModalFooter className="footer">
                <Button
                  className="input-btn"
                  color="success"
                  onClick={() => UpdateProducts(data._id)}
                >
                  Update
                </Button>
                <Button color="secondary" onClick={() => setModalRight(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </div>
          </Modal>
        </Card>
      ) : (
        " "
      )}
      <div
        className="row"
        style={{
          width: "100%",
          height: "90%",
          paddingLeft: "90%",
        }}
      ></div>
      {user1 ? (
        <>
        {admit ? (
          <Button
      onClick={toggle1}
        style={{
          marginTop: "12px",
          marginLeft: "96%",
          boxShadow: '-2px 5px 12px -4px rgba(51,17,3,0.52)'
        }}
      >
        <i class="fa-solid fa-plus"></i>
      </Button>
      ):(
      ''
    )}

      <Modal  isOpen={modal} toggle={toggle1} {...args}>
        <Form className="card-form" onSubmit={handleSubmit}>
          <h2>ADD PRODUCT</h2>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
      
      <FormGroup>
            
            <input
              type="file"
              onChange={Handler}
             style={{marginTop:'15px'}}
             
            />
          </FormGroup>
          
            
          
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          
          <ModalFooter>
            <Button color="success"  
      >
              Submit
             
            </Button>{" "}
            <Button color="secondary" 
      onClick={toggle1}
      >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
        
      </Modal>
   
          {loader ? (
            <div>
              {products.map((data) => (
                <div class="col " key={data._id} className="product-card ">
                  <div class="row" xs={1} md={4} className="g-4 ">
                    <Card
                      style={{
                        width: "22rem",
                        height: "34rem",
                        whiteSpace: "pre-wrap",
                      }}
                      class="c1"
                    >
                      <div class="view rgba-white-slight waves-light ">
                        <div>
                          <img
                            src={data.image}
                            alt="image"
                            width="100%"
                            height="270px"
                          />
                          
                        </div>
                        <CardBody>
                          <div
                            style={{
                              height: "200px",
                              width: "100%",
                              wordBreak: "break-word",
                            }}
                          >
                            <div style={{ overflow: "hidden", height: "30px" }}>
                              <CardTitle>
                                <h4>{data.title}</h4>
                              </CardTitle>
                            </div>
                            <div
                              style={{ overflow: "hidden", height: "50px" }}
                            >
                              <CardText> {data.description} </CardText>
                              
                            </div>
                            
                  <Link className="navLink-product" to={`/products/`+ data._id}>......readme
                  </Link>
                            <CardBody>Rs{data.price}</CardBody>

                          </div>
                          {admit ? (
                            <>
                            
                          <Button
                            className="product-button"
                            onClick={() => deleteProduct(data._id)}
                          >
                            Delete
                          </Button>
                         
                          <Button
                            className="product-button"
                            onClick={() => checkProducts(data._id)}
                          >
                            Edit
                          </Button>
                          </>
                          ):(
                          <>
                          </>
                          )}
                         
                        </CardBody>
                      </div>
                    </Card>
          <ToastContainer 
           autoClose={10}/>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="blocks">
              <ColorRing
                visible={true}
                height="130"
                width="130"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          )}
        </>
      ) : (
        <>
      <Navigate to='/login' replace/>
      
        </>
      )}
    </>
  );
}

export default Products;
