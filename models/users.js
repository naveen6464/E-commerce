const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 UserName: {
    type: String,
    required: true,
  },    
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
 
  password: {
    type: String,
    required: true,
  }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;