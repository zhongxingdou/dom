var Alias = require('./alias')

var _scope = null
var _lastScope = null

function getScope() {
    return _scope || document.body
}

function setScope(wrapEl) {
    if (wrapEl !== _scope) {
        _lastScope = _scope
        _scope = wrapEl
    }
}

function resetScope() {
    _scope = _lastScope
    _lastScope = null
}

function withIn(wrapEl, fn) {
    try {
        setScope(wrapEl)
        fn(wrapEl, Alias.dsl(true))
    } finally {
        resetScope()
    }
}


module.exports = {
    withIn: withIn,
    setScope: setScope,
    getScope: getScope,
    resetScope: resetScope,
}