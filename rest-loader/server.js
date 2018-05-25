var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

var routes = require('./routes.js')

app.listen(port);
routes(app)

console.log('Kichain product loader server started on: ' + port);

