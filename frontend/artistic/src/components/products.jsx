import React, { useState, useEffect } from "react";

import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
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
  Form,
  FormGroup,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const { id } = useParams();
  const forLoader = async () => {
    const response = await fetch("/products", {
      method: "GET",
    });
    const data = await response.json();

    setProducts(data);
    if (response.ok) {
      setLoader(true);
    }
  };
  //get all the products
  useEffect(() => {
    forLoader();
  }, []);

  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    _id: "",
    image: "",
  });

  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin === "true") {
    var admit = admin;
  } else {
    var admit = "";
  }
  //for delete product
  const deleteProduct = async (_id) => {
    const res = await fetch(`/products/${_id}`, {
      method: "DELETE",
    });
    const p = await res.json();

    setProducts(products.filter((i) => i.id !== _id));
    if (res.ok) {
      toast("User is delete ");
      forLoader();
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
    setData({
      json,
      title: json.title,
      description: json.description,
      price: json.price,
      _id: json._id,
    });
    setImage(json.image);
  };

  //update the products
  const UpdateProducts = async (_id) => {
    const data1 = new FormData();
    data1.append("image", image1);
    data1.append("title", data.title);
    data1.append("description", data.description);
    data1.append("price", data.price);
    const response = await fetch(`/products/${_id}`, {
      method: "PUT",
      body: data1,
    });
    const json = await response.json();
    setImage(json);
    if (response.ok) {
      toast("Product is updated");
      setModalRight(false);

      forLoader();
    }
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const submitHandler = (e) => {
    setImage(e.target.files[0]);
    forLoader();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", value1);
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    const response = await fetch(`/products`, {
      method: "POST",
      body: data,
    });
    const value = await response.json();

    if (!response.ok) {
      console.log("error");
      console.log(value);
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      console.log("New Product added:", value);
      forLoader();
      setModal(false);
      toast("Product is added");
    }
  };

  const Handler = (e) => {
    setValue(e.target.files[0]);
  };
  return (
    <>
      {toggle ? (
        <Card className="mb-6">
          <Modal
            isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right"
          >
            <div className="p-4">
              <h2 className="text-center">UPDATE PRODUCT</h2>
              <div>
                <Label className="mt-4">Title</Label>
                <Input
                  name="title"
                  type="text"
                  value={data.title}
                  onChange={handleInputs}
                />
                <Label className="mt-4">Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={data.price}
                  onChange={handleInputs}
                />

                <Input
                  className="mt-4"
                  type="file"
                  files={data.image}
                  defaultValue={data.image}
                  title={image1}
                  name="file"
                  onChange={submitHandler}
                  style={{ marginTop: "15px" }}
                />

                <Label className="mt-4">Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  value={data.description}
                  onChange={handleInputs}
                />
              </div>

              <ModalFooter className="footer">
                <Button
                  color="success"
                  onClick={() => UpdateProducts(data._id)}
                >
                  Update
                </Button>
                <Button   style={{
                                    border:'none',
                                    backgroundColor:'#5161CE',
                                  }} onClick={() => setModalRight(false)}>
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
                marginLeft: "90%",
                backgroundColor:'#5161CE',
              }}
            >
             Add 
            </Button>
          ) : (
            ""
          )}

          <Modal isOpen={modal} toggle={toggle1} {...args}>
            <Form className="card-form p-4" onSubmit={handleSubmit}>
              <h2 className="text-center">ADD PRODUCT</h2>
              <FormGroup>
                <Label className="mt-4">Title</Label>
                <Input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <FormGroup>
                  <input
                    className="mt-4"
                    type="file"
                    onChange={Handler}
                    style={{ marginTop: "15px" }}
                  />
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label className="mt-2">Price</Label>
                <Input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </FormGroup>
              <FormGroup>
                <Label className="mt-2">Description</Label>
                <Input
                  type="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </FormGroup>

              <ModalFooter>
                <Button color="success">Submit</Button>{" "}
                <Button   style={{
                                    border:'none',
                                    backgroundColor:'#5161CE',
                                  }} onClick={toggle1}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

          {loader ? (
            <>
              {products.map((data) => (
                <>
                  <div class="container mt-3">
                    <div class="card float-right">
                      <div class="row">
                        <div class="col-sm-5">
                          <img
                            class="d-block w-100"
                            src={data.image}
                            alt="image"
                          />
                        </div>
                        <div class="col-sm-7">
                          <div class="card-block">
                            <h3>{data.title}.</h3>
                            <p style={{ overflow: "hidden", height: "20px" }}>
                              {data.description}{" "}
                            </p>
                            
                            <Link
                              className="navLink-product"
                              to={`/products/` + data._id}
                            >
                              Read more...
                            </Link>

                            <br />
                            {admit ? (
                              <>
                              
                                <a
                                  class="btn btn-primary btn-sm float-right mt-4"
                                  style={{
                                    border:'none',
                                    backgroundColor:'#5161CE',
                                  }}
                                  onClick={() => checkProducts(data._id)}
                                >
                                  Edit
                                </a>
                                <a
                                  class="btn btn-primary btn-sm float-right mt-4"
                                  style={{
               border:'none',
                                    backgroundColor:'#5161CE',
                                  }}
                                  onClick={() => deleteProduct(data._id)}
                                >
                                  Delete
                                </a>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="blocks">
              <ColorRing
                visible={true}
                height="130"
                width="130"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#5F73DF"]}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <Navigate to="/login" replace />
          <ToastContainer autoClose={10} />
        </>
      )}
    </>
  );
}

export default Products;
