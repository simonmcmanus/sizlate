function createCommonjsModule(c,a){return a={exports:{}},c(a,a.exports),a.exports}var checkForInputs=function(c,a){return"INPUT"===dom.getTag(c)?dom.setAttribute(c,"value",a):dom.setMarkup(c,a),c},newValue=function(c,a){return"object"==typeof a&&a.regex&&a.value?c.replace(a.regex,a.value):"function"==typeof a?a(c):a},updateNodeWithObject=function(h,i){for(var b in i)switch(b){case"selectors":var a=i[b];for(var c in a){var d=dom.query(h,c);dom.setMarkup(d,a[c])}break;case"className":dom.addClass(h,i[b]);break;case"innerHTML":i[b]&&i[b].regex||"function"==typeof i[b]?h.each(function(){var c=dom.get(this);c.innerHTML=i[b]}):dom.setMarkup(h,i[b]);break;case"innerText":i[b]&&i[b].regex||"function"==typeof i[b]?dom.newValue(h,i[b]):h.text(i[b]);break;default:if(i[b]&&i[b].regex||"function"==typeof i[b]){var e=newValue(dom.getAttribute(h,b),i[b]);dom.setAttribute(h,b,e)}else dom.setAttribute(h,b,i[b]);}return h};function updateNode(j,k,b){if(".id"===k)return j.attr("id",b),j;switch(typeof b){case"string":""!==b&&(j=checkForInputs(j,b));break;case"number":j=checkForInputs(j,b);break;case"boolean":if(!1===b)return j.remove();break;case"object":if(b&&b.length){var d=dom.parent(j);if(1===b.length&&!1===b[0])return d.remove();var e=dom.clone(j);b.forEach(function(a,f){var g=dom.clone(e);0===f&&j.remove();var c=updateNode(g,k,b[f]);dom.append(d,c)})}else j=updateNodeWithObject(j,b);}return j}var updateNode_1=updateNode,dom=createCommonjsModule(function(c,e){e.load=function(c){var a=document.createElement("div");return a.innerHTML=c.trim(),a},e.init=function(b){return b},e.find=function(c,a){return c.querySelectorAll(a)},e.getMarkup=function(c){var a=document.createElement("div");return a.appendChild(c.cloneNode(!0)),a.innerHTML},e.setMarkup=function(c,a){c.innerHTML=a},e.get=function(b){return b},e.setAttribute=function(d,a,b){d.setAttribute(a,b)},e.getAttribute=function(c,a){return c.getAttribute(a)},e.addClass=function(c,a){c.classList.add(a)},e.clone=function(b){return b.cloneNode()},e.append=function(c,a){return c.appendChild(a)},e.parent=function(b){return b.parentNode},e.getTag=function(b){return b.tagName.toUpperCase()},e.getText=function(b){return b.innerText},e.setText=function(c,a){return c.innerText=a,c},e.query=function(c,a){return c.querySelector(a)},e.updateNodes=function(d,e,b){d.forEach(function(c){updateNode_1(c,e,b)})},e.newValue=function(b,a){var c=newValue(e.getText(b),a);e.setText(b,c)}}),dom_1=dom.load,dom_2=dom.init,dom_3=dom.find,dom_4=dom.getMarkup,dom_5=dom.setMarkup,dom_6=dom.get,dom_7=dom.setAttribute,dom_8=dom.getAttribute,dom_9=dom.addClass,dom_10=dom.clone,dom_11=dom.append,dom_12=dom.parent,dom_13=dom.getTag,dom_14=dom.getText,dom_15=dom.setText,dom_16=dom.query,dom_17=dom.updateNodes,dom_18=dom.newValue,doRender=function(f,g){if(!g)return f;g="undefined"==typeof g[0]?[g]:g;var h=g.length;g=g.reverse();var i,a=null;for("string"==typeof f?(i=dom.load(f),a="string"):(i=f,a="dom");h--;)Object.keys(g[h]).forEach(function(b){var a=dom.find(i,b);dom.updateNodes(a,b,g[h][b])});if(dom.getMarkup){if("string"===a)return i.innerHTML;if("dom"===a)return i}else return i.html()},classifyKeys=function(c,a){if(!a.classifyKeys||"undefined"==typeof c)return c;for(var b,h=c.length,i=[];h--;){for(var e in b={},c[h])b["."+e]=c[h][e];i.push(b)}return i},render=doRender,classifyKeys$1=classifyKeys,sizlate={render:render,classifyKeys:classifyKeys$1};export default sizlate;export{classifyKeys$1 as classifyKeys,render};