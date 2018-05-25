'use strict';
module.exports = function(app) {
  var product = require('./product.js');

  app.route('/product/:productId')
    .put(product.createContract)
    .get(product.addData)
    .post(product.getData);
};
