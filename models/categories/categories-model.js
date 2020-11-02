'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema');

class Categories extends Model {
  constructor() { super(schema); }
}

module.exports = Categories;
