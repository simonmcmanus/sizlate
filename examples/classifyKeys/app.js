
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

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
      '#comments': {
        partial: 'comment',
        classifyKeys: true,
        data: [{
          author: 'Simon McManus',
          comment: 'Partial example.',
          date: '12th December 1991'
        },
        {
          author: 'Harry Beagle',
          comment: 'Partial example 1.',
          date: '12th December 1992'
        },
        {
          author: 'UNKNOWN',
          comment: 'Partial example 2.',
          date: '12th December 1993'
        }
        ]
      }
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
