var e,t=function(e,t){return"object"==typeof t&&t.regex&&t.value?e.replace(t.regex,t.value):"function"==typeof t?t(e):t},n=(function(e,n){n.load=function(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t},n.init=function(e){return e},n.find=function(e,t){return e.querySelectorAll(t)},n.getMarkup=function(e){var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML},n.setMarkup=function(e,t){e.innerHTML=t},n.get=function(e){return e},n.setAttribute=function(e,t,n){e.setAttribute(t,n)},n.getAttribute=function(e,t){return e.getAttribute(t)},n.addClass=function(e,t){e.classList.add(t)},n.clone=function(e){return e.cloneNode(!0)},n.append=function(e,t){return e.appendChild(t)},n.parent=function(e){return e.parentNode},n.getTag=function(e){return e.tagName.toUpperCase()},n.getText=function(e){return e.innerText},n.setText=function(e,t){return e.innerText=t,e},n.query=function(e,t){return e.querySelector(t)},n.newValue=function(e,r){var u=t(n.getText(e),r);n.setText(e,u)}}(e={exports:{}},e.exports),e.exports);n.load,n.init,n.find,n.getMarkup,n.setMarkup,n.get,n.setAttribute,n.getAttribute,n.addClass,n.clone,n.append,n.parent,n.getTag,n.getText,n.setText,n.query,n.newValue;var r=function(e,t){return"INPUT"===n.getTag(e)?n.setAttribute(e,"value",t):n.setMarkup(e,t),e},u=(e,r)=>(r.selectors&&a(e,r.selectors),delete r.selectors,function(e,r){for(var u in r)switch(u){case"className":n.addClass(e,r[u]);break;case"innerHTML":r[u]&&r[u].regex||"function"==typeof r[u]?e.each((function(e,t){n.get(this).innerHTML=r[u]})):n.setMarkup(e,r[u]);break;case"innerText":r[u]&&r[u].regex||"function"==typeof r[u]?n.newValue(e,r[u]):e.text(r[u]);break;default:if(r[u]&&r[u].regex||"function"==typeof r[u]){var i=t(n.getAttribute(e,u),r[u]);n.setAttribute(e,u,i)}else n.setAttribute(e,u,r[u])}return e}(e,r)),i=(e,t)=>{if(null===t)return e;switch(typeof t){case"string":""!==t&&r(e,t);break;case"number":r(e,t);break;case"boolean":if(!1===t)return e.remove();break;case"object":if(t&&t.length){const r=n.parent(e);t.forEach(t=>{const u=n.clone(e);i(u,t),n.append(r,u)}),e.remove()}else u(e,t)}},a=(e,t)=>{Object.entries(t).forEach(([t,r])=>{n.find(e,t).forEach(e=>{i(e,r)})})},o=a,c=function(e,t){if(!t)return e;var r,u=(t=void 0===t[0]?[t]:t).length;t=t.reverse();var i=null;for("string"==typeof e?(r=n.load(e),i="string"):(r=e,i="dom");u--;)o(r,t[u]);return n.getMarkup?"string"===i?r.innerHTML:"dom"===i?r:void 0:r.html()},s=function(e,t){if(!t.classifyKeys||void 0===e)return e;for(var n=e.length,r=[];n--;){var u={};for(var i in e[n])u["."+i]=e[n][i];r.push(u)}return r},f={render:c,classifyKeys:s};export{s as classifyKeys,f as default,c as render};
