const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  contact:String,
  password:String,
});
const userSchema = new mongoose.Schema({
  loginid:String,
  name:String,
  profile:String,
  about:String,
  contact:String
});
const messageSchema = new mongoose.Schema({
  sender_id:String,
  receiver_id:String,
  message:String,
  cdate:Date,
  ctime:String
});


const loginModel = mongoose.model('login', loginSchema);
const userModel = mongoose.model('user', userSchema);
const messageModel = mongoose.model('message', messageSchema);


module.exports = {loginModel,userModel,messageModel}
