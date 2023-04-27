import React from "react";
import { CardText, Button } from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import Image from '../image/simon-lee-ynmPY1MLwMs-unsplash.jpg'
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    
      {user ? (
       
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <img src={Image}  alt="logo" style={{width:'130%' , height:'120vh' }} />
            </div>
            <div className="col-md-5 "style={{marginTop:'25%', marginLeft:'9rem'}} >
              <h1>Artistic</h1>
              <CardText>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
                dolorem maxime exercitationem possimus aut nisi vitae at
                consectetur officia, fuga eius tempore, consequuntur et dolore
                eligendi ea quidem iure sed?
              </CardText>
              <div>
                <Link className="navLink" to="/contact">
                  <Button    style={{
               border:'none',
                                    backgroundColor:'#5161CE',
                                  }}>Contact Us</Button>
                </Link>
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
