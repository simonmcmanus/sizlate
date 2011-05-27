var sizlate = require('./sizlate.js');
var app = require('express').createServer();

app.set( "view engine", "html" );

app.register('.html', {
    compile: function(str, options) {
        return function(locals) {
            return sizlate.render(str, {locals: locals});
        }
    }
});

app.get('/', function(req, res){
	res.render('page1.html', {
		locals: {
			selectors: {
				'h1:first':'REPLACED: template test title',
				'h2':'replaced h2',
				'ul li': ['item 1', 'item2', 'item3']
				
			}
		}
	});
});

app.listen(8000);



