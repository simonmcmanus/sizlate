var express = require('express');
var sizlate = require('sizlate');

var app =  express.createServer();

app.register('.html', sizlate);

app.get('/', function(req, res) {
	res.render(__dirname+'/views/home.html', {
		selectors: {
			'a': 'hi there'
		}	
	});
});

app.listen(8000);
console.log('check out http://localhost:8000');	
