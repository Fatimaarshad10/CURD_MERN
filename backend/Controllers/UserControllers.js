const User = require("../models/UserData");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const getUserData = async (req, res) => {
  // method findOne
  const User1 = await User.find({});

  res.status(200).json(User1);

};
// const logout = (req,res)=>{
//   console.log('yah')
//   res.clearCookie('jst');
//   console.log(`${req.cookies.jst}`)
//   res.end()
// }

const deleteUserData = async (req, res) => {
  // method findByIdAndDelete

  const { id } = req.params;
  try {
    const User1 = await User.findByIdAndDelete({ _id:id});
    if(User1){
      res.status(200).send(User1);
    }
    else{
    res.status(400).send('User cannot delete the item ')
    }


  } catch (err) {
    res.status(400).send(err.message);
  }
};
const updateUserOne = async(req,res)=>{
  const { id } = req.params
  try{
    const users = await User.findOne({_id:id },{
      ...req.body   
  })
    res.status(200).json(users)
}
  catch(error){
    res.status(400).send(error.message);

  }
}
const updateUserData = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  // method findByIdAndUpdate
  try {
    const User1 = await User.findByIdAndUpdate(
      { _id: id },
      { name, email, password }
    );
    res.status(200).send(User1);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const Register = async (req, res) => {
  const { name, email, password ,admin} = req.body;
  try {
    if (!name || !email || !password|| !admin) {
      throw Error(" Fill Input Field");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const User1 = new User({ name, email, password ,admin});
    const salt = await bcrypt.genSalt(10)
    User1.password = await bcrypt.hash(User1.password,salt)
    // Create token
    // const token = jwt.sign(
    //   { User_id: User1._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );
    // save user token
    // User1.token = token;

    await User1.save();
    
    res.status(200).json("user registered successfully");
    
  } catch (err) {
    res.status(400).send(err.message);
    
  }
};
const Login = async (req, res) => {
  const { email, password ,admin} = req.body;
  try {
    if (!email || !password || !admin) {
      throw Error("Fill Input Field");
    }
    const User2 = await User.findOne({ email: email,admin:admin});
    const HashPassword = await bcrypt.compare(JSON.stringify(password), JSON.stringify(User2.password));
    if (HashPassword ) {
      res.status(200).json({ message: "Valid password" });
    }
    if (User2) {
      const token = jwt.sign(
        { user_id: User2._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      // User2.token = token;
      res.cookie('jst', token,{
        expires:new Date(Date.now() + 60000),
        httpOnly:true,
      })
      res.status(200).json(User2);
      console.log("user is login");
    } else {
      res.status(400).json("register yourself");
    }
  } 
  catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getUserData,
  deleteUserData,
  updateUserData,
  updateUserOne,
  Register,
  Login,
  // logout

};
