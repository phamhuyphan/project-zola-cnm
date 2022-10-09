const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};
  console.log(req.user);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, pic } = req.body;

  if (!username || !email || !password || !fullname) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    fullname,
    email,
    password,
    pic,

  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      //isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/user/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      //isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const addFriend = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const added = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { friends: userId } },
    { new: true }
  );

  if (!added) {
    res.status(404);
    throw new Error(`Post not found`);
  } else {
    res.json({
      _id: added._id,
      username: added.username,
      fullname: added.fullname,
      email: added.email,
      friends: added.friends,
      //isAdmin: user.isAdmin,
      pic: added.pic,
    });
  }
});



module.exports = { allUsers, registerUser, authUser, addFriend };
