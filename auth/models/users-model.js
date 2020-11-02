'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {type:String, required:true, default: 'user', enum:['user','author','editor','admin']}
})

users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
  console.log('The password is', this.password);
});

users.methods.can = function(capability){
  const roles = {
    user: ['read'],
    author:['create', 'read'],
    editor:['create', 'read', 'update'],
    admin: ['create', 'read', 'update', 'delete']
  }
  //check user role
  //compaire aginst roles obj
  //if user role contains capability
  //return good
  return roles[this.role].includes(capability);
}

users.methods.generateToken = function () {
  let tokenObject = {
    username: this.username,
  }
  let token = jwt.sign(tokenObject, process.env.SHOES)
  return token;
}

users.statics.validateBasic = async function (username, password) {


  let user = await this.findOne({ username: username });

  let isValid = await bcrypt.compare(password, user.password)

  if (isValid) { return user; }
  else { return undefined; }

}

users.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SHOES);
    const user = this.findOne({ username: parsedToken.username })
    return user;
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', users);
