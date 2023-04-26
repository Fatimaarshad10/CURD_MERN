import React from "react";
import "../css/home.css";
import { CardText, Button } from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import "../css/home.css";
import page from "../image/new.png";
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user ? (
        <div className="home-container">
          <div className="row">
            <div className="col-md-5">
              <img src={page} className="home-img" alt="logo" />
            </div>
            <div className="col-md-5 header1" style={{ marginTop: "8%" }}>
              <h1>Artistic</h1>
              <CardText>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
                dolorem maxime exercitationem possimus aut nisi vitae at
                consectetur officia, fuga eius tempore, consequuntur et dolore
                eligendi ea quidem iure sed?
              </CardText>
              <div>
                <Link className="navLink" to="/contact">
                  <Button color="secondary">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navigate to="/login" replace />
        </>
      )}
    </>
  );
}

export default Home;
