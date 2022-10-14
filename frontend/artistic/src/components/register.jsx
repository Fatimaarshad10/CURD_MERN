import React, { useState } from "react";
import { Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../image/emoji.gif'
function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    admin:""
  });
  const navigate = useNavigate();
  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegister({ ...register, [name]: value });
  };
  // const naviagtion = navigate('/login')

  const RegisterForm = async () => {
    try {
      const { name, email, password,admin} = register;
      const response = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password ,admin}),
      });
      const data = await response.json();
      setRegister(data);

      if(response.ok){ 
      toast('user is registered')

      setTimeout(()=>{
        navigate("../login");
      },1000)
      }

    } catch {
      toast("All field must be filled ");
    }
  };
const user =  JSON.parse(localStorage.getItem("user"))

  return (
    <>
    {user ? (
      <>
   {/* {naviagtion} */}
      </>
    ):(
      <div className="reg-container">
        <h1 className="reg-heading">Sign Up</h1>

        <Form className="reg-form">
          <Row>
            <FormGroup>
              <Label className="reg-label">Name</Label>
              <Input
                name="name"
                type="name"
                value={register.name}
                onChange={handleInputs}
              />
            </FormGroup>
            <FormGroup>
              <Label className="reg-label" for="email">Email</Label>
              <Input
                name="email"
                type="email"
                id='email'
                value={register.email}
                onChange={handleInputs}
              />
            </FormGroup>
            <FormGroup>
              <Label className="reg-label" for="password" >Password</Label>
              <Input
                name="password"
                type="password"
                id="password"
                value={register.password}
                onChange={handleInputs}
              />
            </FormGroup>
           
    <FormGroup>
            
    <Input
    className="mb-3"
    type="select"
    name="admin"
                value={register.admin}
                onChange={handleInputs} >
    <option  value={true}>
      Admin 
    </option>
    <option  value={false}>
     User
    </option>
  </Input>
  
  </FormGroup>
          </Row>
          <Button className="register-button" onClick={() => RegisterForm()}>
            Sign Up
          </Button>
          <ToastContainer
          autoClose={10}/>
        </Form>
      </div>
    )}
    </>
  );
}

export default Register;
