require("dotenv").config();
const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const Products = require("./routes/ProductRouters");
const Artistic = express();
const Users = require("./routes/UserRouters");
const cookie = require('cookie-parser')
//Middleware
Artistic.use('/profile', express.static('./images'));

Artistic.use(cors());
Artistic.use(express.json());
Artistic.use(cookie());
Artistic.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
Artistic.use("/users", Users);
Artistic.use("/products", Products);
console.log(process.env.MONGO_URI);
// app.use(express.static(__dirname));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    Artistic.listen(process.env.PORT, () => {
      console.log("listening", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
