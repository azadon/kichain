'use strict';
module.exports = function(app) {
  var product = require('./controller.js');

  app.route('/product')
    .put(product.createContract)
    .get(product.addData)
    .post(product.getData);
};
