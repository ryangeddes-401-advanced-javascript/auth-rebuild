'use strict';

const uuid = require('uuid').v4;
const events = require('../events');
require('../indexer/indexer.js');

events.on('toParser', parse);

function parse(payload) {

  let data = {
    date: new Date(),
    userid: payload.userid,
    errortype: payload.err.name,
    errormessage: payload.err.message,
    userparam: payload.userparam,
    usernote: payload.usernote,
    stack: payload.err.stack,
  };
  events.emit('toIndexer', data);
}
