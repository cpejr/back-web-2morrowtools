const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if(user.isModified("password")){
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt);
  
    user.password = hash;
  }

next(); 
})

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
