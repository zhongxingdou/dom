function Alias(cache) {
    this.__map = {}
    this.__cache = cache === undefined ? true : !!cache
}

var proto = Alias.prototype

Alias.dsl = function(cache) {
    var alias = new Alias(cache)

    var dsl = function(name) {
        return alias.el(name)
    }

    var func = ['cache', 'set', 'unset', 'clear']
    func.forEach(function(method) {
        dsl[method] = alias[method].bind(alias)
    })

    return dsl
}


proto.cache = function(value) {
    this.__cache = !!value
}

proto.set = function(name, selector, getAll) {
    if (typeof name === 'object') {
        getAll = selector
        for (var p in name) {
            this.set(p, name[p], getAll)
        }
        return
    }

    if (typeof selector === 'object') {
        selector = selector.selector
        getAll = selector.getAll
    }

    if (/^\[.*\]$/.test(selector)) {
        selector = selector.slice(1, selector.length - 1)
        getAll = true
    }

    this.__map[name] = {
        selector: selector,
        getAll: !!getAll
    }

    return this
}

proto.unset = function(name) {
    delete this.__map[name]
    return this
}

proto.clear = function() {
    this.__map = {}
}

proto.el = function(name) {
    var map = this.__map[name]
    if (map) {
        if (this.__cache && result in map) { 
            // 只要有result这个成员，不论它是否为空
            return map.result
        } else {
            var result
            if (map.getAll) {
                result = document.querySelectorAll(map.selector)
            } else {
                result = document.querySelector(map.selector)
            }

            if (this.__cache) {
                this.result = result
            }

            return result
        }
    }
}

module.exports = Alias