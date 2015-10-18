#Sizlate

Sizlate is an HTML templating engine.

Sizlate requires no special syntax, your templates only contain valid HTML.

Templates are populated using sizzle selectors (as used in jQuery).

Can can pass render a string of html, or a dom Node. If you specify a DOM node the rendering will happen on the page.


##Examples


###Simple text example


```js

var html = '<div> id="example"></div>';
var selectors = {
	'#example': 'Hello World'
};
var out = sizlate.render(html, selectors);

```
See /examples


###Clientside

From v1.0.0 Sizlate works in the browser.

```js
var domNode = document.getElementById('area');
var selectors = {'div': 'new content'};
sizlate.render(domNode, selectors);
```

```js
var $domNode = $('#area');
var selectors = {'div': 'new content'};
sizlate.render($domNode, selectors);
```

#Express

From sizlate v1 Express is not supported.

For the moment you will need to use an older version of sizlate.

The functionality is being moved into https://github.com/simonmcmanus/sizlate-express
