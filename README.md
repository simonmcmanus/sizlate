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

```html
<div>
	<a href="">UPDATED</a>
</div>
```



###ClassName

```js
var html = '<div><a class="class1"></a></div>';
var selectors = {
    'div a': {
        className: 'class2'
    }
};
var out = sizlate.render(html, selectors);
```
```html
<div>
	<a class="class1 class2"></a>
</div>
```

###Arrays
```js
var html = '<ul><li></li></ul>';
var selectors = {
    'li': [
        'change links to this',
        'change links to this2',
        {
            'href': 'df',
            innerHTML: 'aaa'
        }
    ]
};
var out = sizlate.render(html, selectors);
```
```html
<ul>
	<li>change links to this</li>
	<li>change links to this2</li>
	<li href="df">aaa</li>
</ul>
```

###Object
```js
var html = '<div><a></a></div>';
var selectors = {
    'a': {
        href: 'http://yahoo.com',
        title: 'yahoo',
        innerHTML: 'yahoo'
    }
};
var out = sizlate.render(html, selectors);
```
```html
<div>
	<a href="http://yahoo.com" title="yahoo">yahoo</a>
</div>
```

###Regular Expression
```js
var html = '<div><a>existing text</a></div>';
var selectors = {
    'a': {
        'innerText': {
            regex: /existing ([a-z]+)/ig,
            value: 'new $1'
        }
    }
};
var out = sizlate.render(html, selectors);
```
```html
<div>
	<a>new text</a>
</div>
```

See /examples


###Clientside

From v1.0.0 Sizlate works in the browser. You can pass it a string of html or a dom node. For example:

```js
var $domNode = $('#area');
var selectors = {'div': 'new content'};
sizlate.render($domNode, selectors);
```
You will need to have jQuery (window.$) on the page, or something like Zepto that provides a jQuery like api.

That said, you don't have to use jQuery to select the dom node, eg:

```js
var domNode = document.getElementById('area');
var selectors = {'div': 'new content'};
sizlate.render(domNode, selectors);
```

#Express

From sizlate v1 Express is not supported.

For the moment you will need to use an older version of sizlate.

The functionality is being moved into https://github.com/simonmcmanus/sizlate-express
