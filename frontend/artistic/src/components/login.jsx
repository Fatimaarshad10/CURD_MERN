import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import "../css/login.css";
import {toast,ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
  
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [admin , setAdmin] = useState("")
  const navigate = useNavigate();

  const LoginUser = async () => {
    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          admin
        }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        toast('User login successfully')
        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("admin", JSON.stringify(admin));
        setTimeout(()=>{
        navigate("/");
        },1000)
      } else {
        toast("Invalid Credentials!");
      }
    } catch {
      toast("All field must be filled ");
    }
  };
  // const naviagtion = navigate('/login')
const user =  JSON.parse(localStorage.getItem("user"))
  return (
    <>
    {user ? (
      <>
      
      {/* {naviagtion} */}
      </>
    ):(
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <Form className="login-form" for="email">
          <Row>
            <FormGroup>
              <Label>Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
           
           
            <FormGroup>
            <>
            <Input
    className="mb-3"
    type="select"
    name="admin"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)} >
    <option  value={true}>
      Admin 
    </option>
    <option  value={false}>
     User
    </option>
  </Input>
          
  </>

  </FormGroup>
          </Row>

          <Button className="login-button" onClick={() => LoginUser()} > Login</Button>
          <ToastContainer 
          autoClose={10}/>
        </Form>
        
      </div>
      )}
    </>
  );
}

export default Login;
