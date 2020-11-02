'use strict';

const yargs = require('yargs');
const searchHead = require('./search_head/search_head.js');

yargs.version('1.1.0');

////  get
yargs.command({
  command: 'get',
  describe: 'Get records based on a userid, datetime, errortype, userparam',
  builder: {
    id: {
      describe: 'Record ID',
      demandOption: false,
      type: 'Int'
    },
    userid: {
      describe: 'Programmer\'s user ID',
      demandOption: false,
      type: 'string'
    },
    date: {
      describe: 'Use date with month, day, and year',
      demandOption: false,
    },
    errortype: {
      describe: 'Enter Error Type. ex ReferenceError, TypeError, SyntaxError',
      demandOption: false,
      type: 'string'
    },
    userparam: {
      describe: 'Enter param that threw the error',
      demandOption: false,
      type: 'string'
    }
  },
  handler(argv) {
    searchHead.getRecord(argv);
  }
});


////  update
yargs.command({
  command: 'update',
  describe: 'Update usernote based on the record id',
  builder: {
    id: {
      describe: 'id',
      demandOption: true,
      type: 'Int'
    },
    usernote: {
      describe: 'usernote',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    searchHead.update(argv.id, argv.usernote);
  }
});


////  delete
yargs.command({
  command: 'delete',
  describe: 'Delete a record based on the id',
  builder: {
    id: {
      describe: 'id',
      demandOption: true,
      type: 'Int'
    }
  },
  handler(argv) {
    searchHead.delete(argv.id);
  }
});


yargs.parse();
