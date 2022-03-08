const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    valdate: [validator.isEmail, "email is required"],
    required: [true, "user should have a email"],
    unique: true,
  },
  password: {
    required: [true, "password is required"],
    minLength: 8,
    type: String,
    select: false,
  },
  passwordConfirm: {
    type: String,
    minLength: 8,
    valdate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
  diary: [
    {
      //connecting the user object to the database
      type: Schema.Types.ObjectId,
      ref: "Diary",
    },
  ],
});
//adding password and username field
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//a method to compare password
userSchema.methods.correctPassword = async function (candPAss, userPass) {
  return await bcrypt.compare(candPAss, userPass);
};

const user = mongoose.model("User", userSchema);
module.exports = user;
