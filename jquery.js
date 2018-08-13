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
    },

    clone: function() {
        // const copied = [];

        // this.each((i , el) => {
        //     copied.push(el.cloneNode(true));
        // });

        const copied = Array.prototype.map.call(this, el => {
            return el.cloneNode(true);
        });
        
        this.length = 0;
        Array.prototype.push.apply(this, copied)
        return this;
    },

    on: function(eventName, callback) {
        this.each((i, el) => {
            el.addEventListener(eventName, callback);
        })

        return this;
    },

    off: function(eventName, callback) {
        if (arguments.length === 0) {
            this.each((i, el) => {
                el.replaceWith(el.cloneNode(true))
            })

            return this;
        }

        this.each((i, el) => {
            el.removeEventListener(eventName, callback);
        })

        return this;
    }
});