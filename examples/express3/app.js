
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sizlate = require('sizlate');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'sizlate');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
console.log(sizlate);

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', { 
    layout: 'layout',
   selectors: {
      '#comments': {
        partial: 'part',
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
