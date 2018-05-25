'use strict';

var product = require('product'),

exports.createContract = function(req, res) {
  console.log(req.body)
  try {
    result = product.createContract(req.body)
    res.json(task);
  }catch(err)
  {
    res.send(err);
  }
}

exports.addData = function(req, res) {
  console.log(req.body)
  try {
    result = product.addData(req.body)
    res.json(task);
  }catch(err)
  {
    res.send(err);
  }
};

exports.getData = function(req, res) {
  console.log(req.body)
  try {
    result = product.createContract(req.body)
    res.json(task);
  }catch(err)
  {
    res.send(err);
  }
};
