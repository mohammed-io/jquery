function $(param) {
    if (!(this instanceof $)) {
        return new $(param);
    }

    if (typeof param === 'string') {
        Array.prototype.push.apply(this, document.querySelectorAll(param));
    }

    if (param instanceof HTMLElement) {
        Array.prototype.push.call(this, param);
    }
}

$.extend = function(destination, source) {
    for(let prop in source) {
        destination[prop] = source[prop];
    }
    return destination;
}

$.extend($.prototype, {
    each: function(callback) {
        Array.prototype.forEach.call(this, (x, i) => {
            callback(i,x);
        })
        return this;
    }
});