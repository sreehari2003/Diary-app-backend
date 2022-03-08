const util = require("util");
const encoder = new util.TextEncoder("utf-8");
const users = require("../model/user");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

//function to crate jwt token for
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//signup function
exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const response = await users.create({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  const token = createToken(response._id);
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  //creating jwt token
  res.status(200).json({
    ok: true,
    data: response,
    token,
  });
  //   next();
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new appError("no email or password provided", 401));
  }
  const member = await users.findOne({ email: email }).select("+password");

  //compare the password with db
  //correctpassword is a method in users schema
  if (!member || !(await member.correctPassword(password, member.password))) {
    return next(new appError("please provide a valid email or password", 401));
  }
  const token = createToken(member._id);
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  res.status(201).json({
    ok: true,
    token: token,
    id: member._id,
  });
});
//protecting route miidleware logi route
exports.protect = catchAsync(async (req, res, next) => {
  //checking the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new appError("you are not logged in", 401));
  } else {
    const result = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
  }
  //validate the token

  //check  user still exist

  //check if user password was changed

  next();
});
