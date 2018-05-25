'use strict';
module.exports = function(app) {
  var product = require('./controller.js');

  app.route('/product')
    .put(product.createContract)
    .post(product.addData)
    .get(product.getData);
};
