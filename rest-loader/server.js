var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes.js')
routes(app)

app.listen(port);

console.log('Kichain product loader server started on: ' + port);

