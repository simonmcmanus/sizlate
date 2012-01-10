var express = require('express');
var sizlate = require('sizlate');


var app =  express.createServer();
app.register('.html', sizlate);

app.configure( function () {  app.set('dirname', __dirname) });


/*
Tests addressing a node via three types of selector, tag, class and id.
*/
app.get('/', function(req, res) {
	res.render(__dirname+'/views/home.html', {
		selectors: {
			'li': 'PASS',
			'.2': 'PASS',
			'#3': 'PASS'
			
		}	
	});
});

app.listen(8000);
console.log('check out http://localhost:8000');	

