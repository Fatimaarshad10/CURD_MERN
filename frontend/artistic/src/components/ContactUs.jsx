import React, { useEffect, useState, useRef } from "react";
import { Row, FormGroup, Label, Input, Button } from "reactstrap";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
function ContactUs() {
  const [contact, setContact] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ze7uhod",
        "template_o9yh7sj",
        form.current,
        "JnQi-DvbQkIXK4xA-"
      )
      .then(
        (result) => {
          toast("Message has been sent ");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    fetch("/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setContact(data))

      .catch((err) => {
        console.log(err.message);
      });
  }, [contact]);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setContact({ ...contact, [name]: value });
  };
  return (
    <>
      {user ? (
        <div className="login-container">
          <h1 className="login-heading">Contact Us</h1>
          <form className="login-form" onSubmit={sendEmail} ref={form}>
            <Row>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  type="email"
                  value={user}
                  onChange={handleInputs}
                />
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <Input name="message" type="textarea" />
              </FormGroup>
            </Row>
            <Button
                 style={{
                  border:'none',
                                       backgroundColor:'#5161CE',
                                       marginLeft: "145px", width: "40%"
                                     }}
             
            >
              Submit
            </Button>

            <ToastContainer autoClose={10} />
          </form>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

export default ContactUs;
