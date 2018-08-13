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
    },

    append: function(elements) {
        if (Array.isArray(elements)) {
            for (let element of elements) {
                this.each((i, x) => {
                    x.appendChild(i === 0 
                        ? element
                        : element.cloneNode(true));
                });
            }
        } else if (elements instanceof HTMLElement) {
            this.each((i, x) => {
                x.appendChild(i === 0 
                    ? elements 
                    : elements.cloneNode(true));
            });
        }
        return this;
    }
});