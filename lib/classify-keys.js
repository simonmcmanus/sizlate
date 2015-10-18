'use strict';

module.exports = function (data, options) {
    if (!options.classifyKeys || typeof data === 'undefined') {
        return data;
    }
    var c = data.length;
    var retArray = [];
    while (c--) {
        var newObj = {};
        for (var key in data[c]){
            newObj['.' + key] = data[c][key];
        }
        retArray.push(newObj);
    }
    return retArray;
};
