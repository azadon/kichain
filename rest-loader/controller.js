'use strict';

var product = require('./product.js')

exports.createContract = async function(req, res) {
  console.log(req.body)
  try {
    console.log('Creating contract...')
    var result = await product.createContract(req.body)
    console.log('Result in controller',result)

    res.json(result);
  }catch(err)
  {
    console.log('An error occured')
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
    result = product.getData(req.body)
    res.json(task);
  }catch(err)
  {
    res.send(err);
  }
};
