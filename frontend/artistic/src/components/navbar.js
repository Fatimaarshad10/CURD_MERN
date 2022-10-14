import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  Nav,
  NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";
import icon from "../image/new.png";
import "../index.css";
function App() {
  const navigate = useNavigate();
  const userLogin = () => {
    console.log("user remove");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const admin =  JSON.parse(localStorage.getItem("admin"))
  if(admin === "true"){
    var  admit = (admin)
  }else{
    var  admit = ''
  }
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div style={{ width: "100%" }}>
      <Navbar expand="xl">
        <NavbarBrand href="/">
          <img
            alt="logo"
            src={icon}
            style={{
              height: 40,
              width: 40,
          boxShadow: '-2px 5px 12px -4px rgba(51,17,3,0.52)'

            }}
          />
         Artistic
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {JSON.parse(localStorage.getItem("user")) ? (
              <>
                <NavItem>
                  <NavLink className="navLink" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Link className="navLink" to="/products">
                    Products
                  </Link>
                </NavItem>
                {/* <NavItem>
                  <Link className="navLink" to="/detail">
                   detail
                  </Link>
                </NavItem> */}
                {admit ?(
                <>
                <NavItem>
                  <Link className="navLink" to="/users">
                    Users
                  </Link>
                </NavItem>
                </>
                ):('')}
                <NavItem>
                  <Link className="navLink" to="/contact">
                    Contact
                  </Link>
                </NavItem>
                {/* <NavItem>
                  <Link className="navLink" to="/logout">
                   LOGOUT
                  </Link>
                </NavItem> */}
                <NavItem>
                  
                  <button onClick={() => userLogin()}
                  style={{border:'none',
                  background:'none'}}>logout</button>
                </NavItem>
                
              </>
            ) : (
              <>
                <NavItem>
                  <Link className="navLink" to="/register">
                    Register
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="navLink" to="/login">
                    Login
                  </Link>

                </NavItem>
                
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default App;
