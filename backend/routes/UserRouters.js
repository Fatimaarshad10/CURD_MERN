const express = require("express");
const {
  getUserData,
  updateUserData,
  deleteUserData,
  Register,
  Login,
  updateUserOne,
  // logout,

} = require("../Controllers/UserControllers");

const Users = express.Router();
//get all the users
Users.get("/", getUserData);
// update the all user details
Users.put("/:id", updateUserData);
// delete the use
Users.delete("/:id", deleteUserData
);
// Users.get('/logout', logout)
Users.get("/:id", updateUserOne);

// register the use
Users.post("/register", Register);
// login the user
Users.post("/login", Login);
module.exports = Users;
