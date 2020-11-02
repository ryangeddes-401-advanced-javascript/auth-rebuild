'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();
const bearer = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

const express = require('express');

const modelFinder = require(`${cwd}/middleware/model-finder.js`);

//REMOVED NEW
const router =  new express.Router();


// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', async (request, response) => {
  const models = await modelFinder.list()
  response.status(200).json(models);
});

// JSON Schema for a model
router.get('/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


// CRUD Routes

//TODO: get requires auth only, no specific roles
router.get('/:model', bearer, handleGetAll);
router.get('/:model/:id', bearer, handleGetOne);
//TODO: post  should require the create capability
router.post('/:model', bearer, acl('create'), handlePost);
//TODO: put and patch should require the update capability
router.put('/:model/:id', bearer, acl('update'), handlePut);
//TODO: delete should require the delete capability
router.delete('/:model/:id', bearer, acl('delete'), handleDelete);

// Route Handlers
async function handleGetAll(request, response, next) {
  try{
      let result = await request.model.get(request.query);
      const output = {
        count: result.length,
        results: result,
      };
      response.status(200).json(output);
  }catch(e){
    next(e);
  }
}

function handleGetOne(request, response, next) {
  req.model.get({ _id: request.params.id })
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function handlePost(request, response, next) {
  console.log(request.model);
  request.model.create(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

function handlePut(request, response, next) {
  request.model.update(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

async function handleDelete(request, response, next) {
  try{
    let result = await request.model.delete(request.params.id);
    response.status(200).json(result);
    } catch(e){
      next(e);
    }
}

module.exports = router;
