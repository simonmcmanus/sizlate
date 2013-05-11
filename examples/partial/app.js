
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');


var sizlate = require('../../sizlate.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'sizlate');
});

app.get('/', function(req, res){
  res.render('index', {
    layout: 'layout',
    selectors: {
      'ul#list': {
        partial: 'part',
        data: [
          { '.name': 'Bob1' },
          { '.name': 'Bob2' },
          { '.name': {innerHTML: 'anna3'} }
        ]
      }
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
