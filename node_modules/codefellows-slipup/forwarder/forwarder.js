'use strict';

const events = require('../events.js');
require('../parser/parser.js');

events.on('errEvent', forwardError);

function forwardError(payload) {
  events.emit('toParser', payload);
}

