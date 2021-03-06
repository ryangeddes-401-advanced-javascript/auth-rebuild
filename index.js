'use strict';

// dependencies
let mongoose = require('mongoose');
let server = require('./server.js');
require('dotenv').config();

// connect to mongo
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// start the server
server.start(process.env.PORT);
