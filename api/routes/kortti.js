const express = require('express');
const router = express.Router();
const kortti = require('../models/kortti_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    kortti.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });

  } else {
    kortti.get(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

router.get('/asiakas/:id?', (request, response) => {
    kortti.getAsiakasByKortti(request.params.id, (err, dbResult) => {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult[0]);
      }
    });
});

router.post('/', 
function(request, response) {
  kortti.add(request.body, function(err, count) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body); 
    }
  });
});

router.delete('/:id', 
function(request, response) {
  kortti.delete(request.params.id, function(err, count) {
    if (err) {
      response.json(err);
    } else {
      response.json(count);
    }
  });
});

router.put('/:id', 
function(request, response) {
  kortti.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;
