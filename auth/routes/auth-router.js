'use strict';

const express = require('express');

const basicAuth = require('../middleware/basic.js');
const bearer = require('../middleware/bearer.js');
const oauth = require('../middleware/oauth.js');
const users = require('../models/users-model.js');

// Initialize Express Router
const router = express.Router();

router.get('/oauth', async (req, res, next)=>{

  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
})

router.get('/oauth-callback', oauth, (req, res) => {

});



router.post('/signup', async (req, res, next) => {

  // TODO:
  // 1. within your usersmodel/schema write an array/object of different roles.  Define what CRUD capabilities each role posesses.
  // 2. Update your users model/schema, add a required role value.  when defining role in your users schema, Look up 'enum' in mongoose docs.
  // 2b. in auth router, be sure to update the obj passed into the users model to include role
  // 3. Write a 'can' method on the users model that checks if users are able to perform task based on their role.
  // 4. write acl middleware to run on each route and confirm access
  // 5. run that acl middleware on each api route


  try {
    let obj = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    }
    // Create a new instance from the schema, using that object
    let record = new users(obj);

    // Save that instance to the database
    let newUser = await record.save();

    let token = record.generateToken();

    res.set('auth', token);
    let object = {
      token: token,
      user: newUser
    }
    res.status(200).json(object);


  } catch (e) {
    next(e.message);
  }

});

// adding ,basicAuth does?
router.post('/signin', basicAuth, (req, res, next) => {
  res.set('auth', req.token);
  let object = {
    token: req.token,
    user: req.user
  }
  //set user obj to headers
  console.log(req.user.role)
  res.status(200).json(object);
});

router.get('/secret', bearer, (req, res) => {
  //console.log(req.body);
  //console.log(req.headers);
  console.log(req.token);
  res.set('auth', req.token);
  res.status(200).send(`Welcome, ${req.user.username}`)
})

router.get('/secret2', bearer, (req, res) => {
  console.log(req.token);
  console.log(req.headers);
  res.status(200).send(`Welcome, ${req.user.username}`)
})

// router.get('/article', bearer, can('read'), (req, res) => {
//   res.status(200).send('You can read it')
// })

module.exports = router;
