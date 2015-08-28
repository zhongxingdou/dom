function element(el) {
    this.el = el
    this.__handlers = {}
}

element.prototype = {
    attr: function(attr) {
        return this.el.getAttribute(attr)
    },
    setAttr: function(attr, value) {
        this.el.setAttribute(attr, value)
        return this
    },
    prop: function(prop) {
        return this.el[prop]
    },
    setProp: function(prop, value) {
        this.el[prop] = value
        return this
    },
    byCss: function(css) {
        return Dom.withIn(this.el, function() {
            return Dom.byCss(css)
        })
    },
    oneByCss: function(css) {
        return Dom.withIn(this.el, function() {
            return Dom.oneByCss(css)
        })
    },
    byName: function(name) {
        return Dom.withIn(this.el, function() {
            return Dom.byName(name)
        })
    },
    oneByName: function(name) {
        return Dom.withIn(this.el, function() {
            return Dom.oneByName(name)
        })
    },
    byTag: function(tag) {
        return Dom.withIn(this.el, function() {
            return Dom.byTag(name)
        })
    },
    oneByTag: function(tag) {
        return Dom.withIn(this.el, function() {
            return Dom.oneByTag(name)
        })
    },
    data: function(name) {
        if (arguments.length === 0) return this.el.dataSet
        return this.el.dataSet[name]
    },
    on: function(event, delegate, handler) {
        if (typeof delegate === 'function') {
            handler = delegate
            delegate = null
        }

        if (typeof delegate === 'string') {
            var realHandler = function(event) {
                if (this.contains(delegate)) {
                    handler(event)
                }
            }

            var all = this.__handlers[delegate]
            if (!all) {
                all = this.__handlers[delegate] = []
            }

            all.push({
                handler: handler,
                real: realHandler
            })

            el.addEventListener(event, realHandler)
        } else {
            el.addEventListener(event, handler)
        }
        return this
    },
    off: function(event, delegate, handler) {
        if (typeof delegate === 'function') {
            handler = delegate
            delegate = null
        }

        if (typeof delegate === 'string') {
            var all = this.__handlers[delegate]
            if (all) {
                var i, item realHandlerIdx
                for (i = all.length - 1; i >= 0; i--) {
                    item = all[i]
                    if (item.handler === handler) {
                        realHandlerIdx = i
                        break
                    }
                };

                if (realHandlerIdx) {
                    el.removeEventListener(event, all[realHandlerIdx])
                    all.splice(realHandlerIdx, 1)
                }
            }
        } else {
            el.removeEventListener(event, handler)
        }

        return this
    },
    contains: function(el) {
        if (typeof el === 'string') {
            return this.el.querySelectAll(el).length > 0
        } else if (Dom.isElement(el)) {
            var p, n = el,
                thisEl = el
            do {
                p = n.parentNode
                if (p === thisEl) return true
            } while (p)
            return false
        } else if (Dom.isDomCollection(el)) {
            return this.contains(el[0])
        }
    }
}