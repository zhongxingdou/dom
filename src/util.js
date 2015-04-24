function each(els, fn) {
    for (var i = 0, l = els.length; i < l; i++) {
        if (fn(els[i], i) === false) {
            break
        }
    }
}

function findOne(els, fn) {
    var result = null
    each(els, function(el, i) {
        if (fn(el) === true) {
            result = el
            return false
        }
    })
    return result
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

function toArray(o) {
    return Array.prototype.slice.call(o, 0)
}

function variadic(fn) {
    return function(array) {
        if (arguments.length > 1) {
            var result = []
            for (var i = 0, l = arguments.length; i < l; i++) {
                var els = fn(arguments[i])
                if (els) {
                    if (isArray(els) || els instanceof HTMLCollection) {
                        result = result.concat(a)
                    } else {
                        result.push(els)
                    }
                }
            }
            return result
        }

        return fn(array)
    }
}

function filterByTag(tag, fn) {
    return filterBy(function(element) {
        return element.tagName === tag.toUpperCase()
    }, fn)
}

function filterBy(checker, fn) {
    return function(els) {
        if (els instanceof Element) {
            if (checker(els)) {
                return null
            }
        }
        if (isArray(els) || els instanceof HTMLCollection) {
            return toArray(els).filter(function(element) {
                return checker(element)
            })
        }
        return fn(els)
    }
}

function _getFieldType(el) {
    var tagName = el.tagName
    var type = el.type
    if (tagName === 'INPUT') {
        switch (type) {
            case 'radio':
            case 'checkbox':
                return type.toUpperCase()
            case 'button':
            case 'submit':
            case 'reset':
                return 'BUTTON'
            default:
                return 'TEXT'
        }
    } else {
        return tagName
    }
}


var mix = function(to, src, wl, bl){
    if(!to)to = {};

    if(!wl)wl = Object.keys(src);

    if(bl){
        wl.forEach(function(k){
            if(bl.indexOf(k) === -1){
                to[k] = src[k];
            }
        });
    }else{
        wl.forEach(function(k){
            to[k] = src[k];
        });
    }

    return to;
}


module.exports = {
    each: each,
    findOne: findOne,
    isArray: isArray,
    toArray: toArray,
    variadic: variadic,
    filterBy: filterBy,
    filterByTag: filterByTag,
    _getFieldType: _getFieldType,
    mix: mix
}