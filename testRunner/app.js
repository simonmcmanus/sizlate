var express = require('express');
var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'sizlate');

 app.use(function(req, res, next) {
  res.slender = function(params) {
    params.buildData(params.params, function(e, d) {
    //  return res.json(d);
      if(req.headers['content-type'] === 'application-json') {
          res.json(d);
      } else {  // render html
        params.buildSelectors(d, function(selectors) {
          var options = {
            layout: (req.param('_pjax')) ? null : params.layout,
            container: params.container || '#container',
            selectors: selectors
          };
          if(req.headers['content-type'] === 'sizlate') {
              res.json({
                template: params.template,
                selectors: options
              });

          }else {
            res.render(params.template, options);
          }
        });
      }
    });
  };
  next();
 });


 server.listen(app.get('port') || config.port);