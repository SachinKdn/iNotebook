const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // title: String, // String is shorthand for {type: String}
    // author: String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    username: String,
    email:  String, 
    // unique: true, 
    // required: true
   
  password: String,
  date: {
    type: Date,
    unique: true,
    default: Date.now
  }
  });
  const User = mongoose.model('User', userSchema);
  module.exports = User;