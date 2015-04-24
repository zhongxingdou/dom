var scope = require('./scope')

var getScope = scope.getScope

function _makeAttrExp(attr, value) {
    if (typeof attr === 'object') {
        var exps = []
        for (var key in attr) {
            exps.push(_makeAttrExp(key, attr[key]))
        }
        return exps.join('')
    }

    if (value == null) {
        value = attr
    }

    return '[' + attr + '=' + value + ']'
}

function byId(id) {
    return document.getElementById(id)
}

function byTag(tagName) {
    return getScope().getElementsByTagName(tagName)
}

function oneByTag(tagName) {
    return byTag(tagName)[0]
}

function byCss(cssSelector) {
    return getScope().querySelectorAll(cssSelector)
}

function oneByCss(cssSelector) {
    return getScope().querySelector(cssSelector)
}

function byName(name) {
    return document.getElementsByName(name)
}

function oneByName(name) {
    return byName(name)[0]
}

function byClass(className) {
    return getScope().getElementsByClassName(className)
}

function oneByClass(className) {
    return byClass(className)[0]
}

function byAttr(tag, attr, value) {
    var exp = _makeAttrExp(attr, value)
    if (typeof tag === 'string') {
        return by.oneByCss(tag + exp)
    } else if (tag.querySelector) {
        return tag.querySelector(exp)
    }
}

function byTitle(tag, title) {
    return byAttr(tag, 'title', title)
}

function byText(tagName, text) {
    var els = byTag(tagName)
    for (var i = 0, l = els.length; i < l; i++) {
        var el = els[i]
        if (el.textContent === text) {
            return el
        }
    }
    return null
}

function byLabel(text, tags) {
    var label = byText('label', text)
    if (!label) {
        return null
    }

    var id = label.getAttribute("for")
    if (id) {
        return document.getElementById(id)
    }

    var childNodes = label.childNodes
    var controlTags = tags || ['INPUT', 'SELECT', 'TEXTAREA']
    for (var i = 0, l = childNodes.length; i < l; i++) {
        var el = childNodes[i]
        if (controlTags.indexOf(el.tagName) != -1) {
            return el;
        }
    }
}

module.exports = {
    byId: byId,

    byTag: byTag,
    oneByTag: oneByTag,

    byCss: byCss,
    oneByCss: oneByCss,

    byName: byName,
    oneByName: oneByName,

    byClass: byClass,
    oneByClass: oneByClass,

    byAttr: byAttr,

    byTitle: byTitle,
    byText: byText,
    byLabel: byLabel
}