const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
    },
  }, {timestamps: true});
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User

  