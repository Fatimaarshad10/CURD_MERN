import React, { useState, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Blocks } from "react-loader-spinner";
import "../index.css";
function Image() {
  const [check, setCheck] = useState([]);
  const [loader, setLoader] = useState(false);
  const image = async () => {
    const response = await fetch("/products/", {
      method: "GET",
    });
    const data = await response.json();
    setCheck(data);
    if (response.ok) {
      setLoader(true);
    }
  };
  useEffect(() => {
    image();
  }, []);

  return (
    <>
      {loader ? (
        <div>
          {check.map((data) => (
            <div class="col " key={data._id}>
              <div class="row" xs={1} md={4} className="g-4">
                <Card
                  style={{
                    width: "18rem",
                    height: "35rem",
                    whiteSpace: "pre-wrap",
                  }}
                  class="c1"
                >
                  <div class="view rgba-white-slight waves-light Card-design">
                    <CardBody>
                      <div>
                        <img
                          src={data.image}
                          alt="image"
                          width="100%"
                          height="200px"
                        />
                      </div>
                      <div
                        style={{
                          height: "200px",
                          backgroundColor: "green",
                          width: "100%",
                          wordBreak: "break-word",
                        }}
                      >
                        <CardTitle>
                          <h4>Card Title</h4>
                        </CardTitle>
                        <div
                          style={{
                            backgroundColor: "yellow",
                            overflow: "hidden",
                            height: "100px",
                          }}
                        >
                          <CardText> {data.title}</CardText>
                        </div>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      )}
    </>
  );
}

export default Image;
