/**
 * Dom.js v0.0.1
 * (c) 2015 Hal Zhong
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Dom"] = factory();
	else
		root["Dom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// !!! don't format this file
	var assertion    = __webpack_require__(1),
		by           = __webpack_require__(2),
		form_fill    = __webpack_require__(3),
		log          = __webpack_require__(4),
		manipulation = __webpack_require__(5),
		scope        = __webpack_require__(6),
		tag_query    = __webpack_require__(7),
		util         = __webpack_require__(8),
		Alias        = __webpack_require__(9)

	var variadic    = util.variadic,
		filterBy    = util.filterBy,
		filterByTag = util.filterByTag

	var Dom = {
		version: '0.0.1',
		button:   variadic( filterBy(assertion.isButton, tag_query.button)),
		link:     variadic( filterByTag('A', tag_query.link)),
		field:    variadic( filterBy(assertion.isField, tag_query.field)),
		fieldset: variadic( filterByTag('FIELDSET', tag_query.fieldset)),
		form:     variadic( filterByTag('FORM', tag_query.form)),
		hidden:   variadic( filterBy(function (element) {
						return element.tagName === 'INPUT' && element.type === 'hidden'
					}, tag_query.hidden)),
	}

	util.mix(Dom, util)
	util.mix(Dom, assertion)
	util.mix(Dom, by)
	util.mix(Dom, form_fill)
	util.mix(Dom, log)
	util.mix(Dom, manipulation)
	util.mix(Dom, scope)
	Dom.Alias = Alias

	var exclude = ['button','link','field','fieldset', 'form', 'hidden']
	util.mix(Dom, tag_query, null, exclude)

	module.exports = Dom

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(8)
	var _getFieldType = util._getFieldType

	function isField(element) {
	    var type = _getFieldType(element)
	    var validType = ['TEXT', 'CHECKBOX', 'RADIO', 'SELECT', 'TEXTAREA']
	    return validType.indexOf(type) != -1
	}

	function isButton(element) {
	    return _getFieldType(element) === 'BUTTON'
	}


	module.exports = {
	    isField: isField,
	    isButton: isButton
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var scope = __webpack_require__(6)

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(8),
	    log = __webpack_require__(4).log
	    by = __webpack_require__(2)
	    tag = __webpack_require__(7)
	    scope = __webpack_require__(6)

	var findOne = util.findOne,
	    isArray = util.isArray,
	    _getFieldType = util._getFieldType,
	    each = util.each

	function _getEl(el) {
	    return el instanceof Element ? el : null
	}

	function choose(label) {
	    var field = _getEl(label) || by.byLabel(label, ['input'])
	    if (field && field.type === 'radio') {
	        field.checked = true
	    }
	}

	function check( /* label1, label2, ... */ ) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	        var label = arguments[i]
	        var field = by.byLabel(label, ['input'])
	        if (field && field.type === 'checkbox') {
	            field.checked = true
	        }
	    }
	}

	function uncheck( /* label1, label2, ... */ ) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	        var label = arguments[i]
	        var field = by.byLabel(label, ['input'])
	        if (field && field.type === 'checkbox') {
	            field.checked = false
	        }
	    }
	}

	function select(label, optionText) {
	    var selectEl = _getEl(label) || by.byLabel(label, ['select'])

	    if (selectEl) {
	        var options = selectEl.options
	        var i, l, option

	        if (selectEl.multiple) {
	            if (typeof optionText === 'string') {
	                optionText = [optionText]
	            }

	            for (i = 0, l = options.length; i < l; i++) {
	                option = options[i]
	                if (optionText.indexOf(option.text) !== -1) {
	                    option.selected = true
	                }
	            }
	        } else {
	            for (i = 0, l = options.length; i < l; i++) {
	                option = options[i]
	                if (option.text === optionText) {
	                    option.selected = true
	                    break
	                }
	            }
	        }
	    }
	}

	function fillForm(form, labelValueMap) {
	    scope.withIn(form, function() {
	        var label, value, el
	        for (label in labelValueMap) {
	            value = labelValueMap[label]
	            el = by.byLabel(label)
	            if (el) {
	                el.value = value
	                if (el.tagName === 'SELECT') {
	                    select(el, value)
	                }
	            } else { //单选钮组和复选钮组
	                var labelEl = by.byText('label', label)
	                if (labelEl) { //兴趣： 唱歌，跳舞
	                    //假定单选钮组和复选钮组的组label的for设置为组元素的name
	                    var groupName = labelEl.getAttribute('for')
	                    var groupItems = by.byName(groupName)

	                    if (groupItems.length === 0) {
	                        log(label + ' not found')
	                        continue
	                    }

	                    var type = _getFieldType(groupItems[0])
	                    if (['CHECKBOX', 'RADIO'].indexOf(type) === -1) {
	                        log(label + ' should be a checkbox or radio')
	                        continue
	                    }

	                    var isCheckboxGroup = type === 'CHECKBOX'
	                    if (isCheckboxGroup && !isArray(value)) {
	                        log(label + ' value should be a Array')
	                        continue
	                    }

	                    each(groupItems, function(groupEl, i) {
	                        var id = groupEl.id

	                        //通过id找到它对应的label
	                        var labelOfEl = by.byAttr('label', 'for', id)

	                        if (isCheckboxGroup) {
	                            if (value.indexOf(labelOfEl.textContent) !== -1) {
	                                groupEl.checked = true
	                            }
	                        } else { //radio
	                            if (labelOfEl.textContent === value) {
	                                groupEl.checked = true
	                            }
	                        }
	                    })
	                }
	            }
	        }
	    })
	}

	function fillIn(label, value) {
	    var field = by.byLabel(label, ['input', 'textarea'])
	    if (field) {
	        field.value = value
	    }
	}

	function setForm(form, nameValueMap) {
	    scope.withIn(form, function() {
	        for (var name in nameValueMap) {
	            setField(name, nameValueMap[name])
	        }
	    })
	}

	function setField(name, value) {
	    var firstEl = _getEl(name)
	    if (!firstEl) {
	        var els = by.byName(name)
	        firstEl = els[0]
	    }

	    var type = _getFieldType(firstEl)
	    switch (type) {
	        case 'RADIO':
	            var radio = findOne(els, function(radio) {
	                return radio.value == value
	            })
	            if (radio) {
	                radio.checked = true
	            }
	            break
	        case 'CHECKBOX':
	            var strValue = value.map(function(i) {
	                return i.toString()
	            })

	            each(els, function(checkbox) {
	                if (strValue.indexOf(checkbox.value) !== -1) {
	                    checkbox.checked = true
	                } else {
	                    checkbox.checked = false
	                }
	            })
	            break
	        case 'SELECT':
	            var option = findOne(firstEl.options, function(option) {
	                return option.value == value
	            })
	            if (option) {
	                option.selected = true
	            }
	            break
	        case 'TEXT':
	        case 'TEXTAREA':
	            firstEl.value = value
	            break
	    }
	}

	module.exports = {
	    choose: choose,
	    check: check,
	    uncheck: uncheck,
	    select: select,

	    fillIn: fillIn,
	    fillForm: fillForm,

	    setField: setField,
	    setForm: setForm
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __logs = []

	function pushLogHistory(msg) {
	    __logs.push(msg)
	    if (__logs.length > 20) {
	        __logs.shift()
	    }
	}

	if (typeof console !== undefined && console.warn) {
	    function log(msg) {
	        console.warn(msg)
	        pushLogHistory(msg);
	    }
	} else {
	    function log(msg) {
	        pushLogHistory(msg);
	    }
	}

	function getLogs() {
	    return __logs.slice(0)
	}

	module.exports = {
	    log: log,
	    getLogs: getLogs
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	function show(element) {
	    element.style.display = 'block'
	}

	function hide(element) {
	    element.style.display = 'none'
	}

	function disable(element) {
	    element.disabled = true
	}

	function enable(element) {
	    element.disabled = false
	}

	module.exports = {
	    show: show,
	    hide: hide,
	    disable: disable,
	    enable: enable
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Alias = __webpack_require__(9)

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(8)
	var findOne = util.findOne

	function field(label) {
	    var el = byLabel(label)
	    if (Dom.isField(el)) {
	        return el
	    }
	}

	function button(text) {
	    var selector = 'input[type=button][value=' + text + ']'
	    var inputBtn = Dom.oneByCss(selector)
	    if (inputBtn) {
	        return inputBtn
	    } else {
	        return Dom.byText('button', text)
	    }
	}

	function link(text) {
	    return Dom.byText('a', text)
	}

	function fieldset(text) {
	    return Dom.byText('legend', text)
	}

	function hidden(name) {
	    var selector = 'input[type=hidden][name=' + name + ']'
	    return Dom.oneByCss(selector)
	}

	function form(text) {
	    var fieldset = Dom.fieldset(text)
	    if (fieldset) {
	        return fieldset.form
	    }
	    return null
	}

	/**
	 * Dom.row(table, 3)
	 * Dom.row(table, {col1: x, col2: y})
	 * Dom.row(table, {col1: function(x){x > 100}, col2: y})
	 */
	function row(table, where) {
	    if (typeof where === 'object') {
	        var cols = Object.keys(where)
	            // var thead = 
	    }

	    return findOne(table.rows, function(row) {
	        var cell = row.children[0]
	        return cell && cell.textContent.trim() === rowTitle
	    })
	}

	function cell(table, rowIndex, colIndex) {
	    var row = table.rows[rowIndex]
	    if (row) {
	        return row.children[colIndex]
	    }
	}

	function group(label) {
	    var el = Dom.byText('label', label)
	    if (el) { //兴趣： 唱歌，跳舞
	        //假定单选钮组和复选钮组的组label的for设置为组元素的name
	        var groupName = el.getAttribute('for')
	        return Dom.byName(groupName)
	    }
	    return []
	}

	module.exports = {
	    field: field,
	    button: button,
	    link: link,
	    fieldset: fieldset,
	    hidden: hidden,
	    form: form,
	    row: row,
	    cell: cell,
	    group: group
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ])
});
;