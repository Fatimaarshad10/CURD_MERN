import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Button, Card, Modal, Label, Input, ModalFooter } from "reactstrap";
import { ColorRing } from 'react-loader-spinner'
import {toast,ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import "../css/user.css";
function Users() {
// For login
const user1 =  JSON.parse(localStorage.getItem("user"))
// For admin
  const admin =  JSON.parse(localStorage.getItem("admin"))
  if(admin === "true"){
    var  admit = (admin)
  }else{
    var  admit = ''
  }
  const [user, setUser] = useState([]);
  const[data,setData] = useState({
    name:'',
    email:'',
    _id:'',
})
const [loader, setLoader] = useState(false)
const UserLoader = async()=>{

  const response = await fetch("/users", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    },
  })
  const data = await response.json()
  setUser(data)

  if(response.ok){
    setLoader(true)
  }    
}
// fetch("/users", {method: "GET",})
// .then(response => response.json())
// .then(data => setUser(data));
useEffect(()=>{
  UserLoader()
},[])
 
  

  const [toggle, setToggle] = useState(false);
  const [modalRight, setModalRight] = useState(false);
  const editUser = async(_id) => {
    setToggle(!toggle);
    setModalRight(true);
    const response = await fetch(`/users/${_id}`, {
      method:'GET',
      headers: {
        "Content-type": "application/json"
      },
    })
    const json = await response.json()
    console.log(json)
    if(response.ok){
      
      setData({ 
        name: json.name,
        email: json.email,
        _id:json._id,
       
      })
    }
    console.log(data)   
  };
  const putButton = async(_id)=>{
            
    const {
    name,email
    } = data;
    const response = await fetch(`/users/${_id}`, {
      method:'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
       name,email
      }),
    })
    const json = await response.json()
   console.log(json)
   if(response.ok){
    // forceUpdate()
    setModalRight(false)
    UserLoader()
   }
   setTimeout(()=>{
    toast('User is updated')
      },10)
 
}


  const deleteUser = async (_id) => {
    const res = await fetch(`/users/${_id}`, {
      method: "DELETE",
    });
    const p = await res.json();
    console.log(p);
    setUser(user.filter((i) => i.id !== _id));
    if(res.ok){
      UserLoader()
      toast('User is delete ')
    }
    // window.location.reload(true);

  };

  let name, value;
          const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;
            setData({ ...data, [name]: value });
          };
          
  return (
    <>
      
      {toggle ? (
        <Card className="mb-6">
          <Modal
            isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right">
            <div className="App2">
              <h2>User DETAILS</h2>
              <div>
                <Label>Name</Label>
                <Input name="name" type="text" onChange={handleInputs} value={data.name}/>

                <Label>Email</Label>
                <Input name="email" type="text" onChange={handleInputs} value={data.email}/>
              </div>
              <ModalFooter className="footer">
                <Button
                  className="input-btn"
                  color="success"
                  onClick={() => putButton(data._id)}
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
        ""
      )}
      {loader ? (
      <div>
    {user1 ? (
     
      <div className="container" style={{
        boxShadow: '-2px 5px 12px -4px rgba(51,17,3,0.52)'

      }}>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {admit ? (
              <>
            {user.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
               
                  <>
                <td>
                  <Button
                    className="user-button"
                    onClick={() => editUser(data._id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    className="user-button2"
                    onClick={() => deleteUser(data._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
                </>
              </tr>
            ))}
            </>
            ):(
              <></>
            )}
          </tbody>
        </Table>
        <ToastContainer
         autoClose={10}/>

      </div>
            

      ):(
        <>
      <Navigate to='/login' replace/>
        
          </>

      )
      }
            </div>
            ):(
            <div className="user-ColorRing">
<ColorRing
  visible={true}
  height="130"
  width="130"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
            )}

    </>
  );
}

export default Users;
