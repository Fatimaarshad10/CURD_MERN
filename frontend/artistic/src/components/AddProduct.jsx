import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  Input,
  Form,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import "../css/contact.css";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined);
  const [value1, setValue] = useState([]);
  const [modalRight, setModalRight] = useState(false);
  const [toggle, setToggle] = useState(false);
  

  //api call 
  const handleSubmit = async (e) => {
    setToggle(!toggle);
       setModalRight(true);
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
    }
    setModalRight(false)

  };

  
  const submitHandler =(e)=>{
    setValue(e.target.files[0])
  }
  return (
    <>
      <Button
       onClick={() => setModalRight(true)}
        style={{
          marginTop: "12px",
          marginLeft: "96%",
          boxShadow: '-2px 5px 12px -4px rgba(51,17,3,0.52)'
        }}
      >
        <i class="fa-solid fa-plus"></i>
      </Button>

      <Modal   isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right">
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
              onChange={submitHandler}
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
            <Button color="success"  >
              Submit
             
            </Button>{" "}
            <Button color="secondary"onClick={() => setModalRight(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
