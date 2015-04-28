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
		util         = __webpack_require__(8)

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

	function isElement(element){
	    return element instanceof Element
	}

	function isDomCollection(collection){
	    if(!collection)return false
	    return collection instanceof HTMLCollection || collection instanceof NodeList
	}

	function isLabelSelector(label){
	    return /^@/.test(label)
	}

	module.exports = {
	    isField: isField,
	    isButton: isButton,
	    isElement: isElement,
	    isDomCollection: isDomCollection,
	    isLabelSelector: isLabelSelector
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var scope = __webpack_require__(6)
	var assert = __webpack_require__(1)

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
	    var type = typeof cssSelector
	    if (type === 'string') {
	        return getScope().querySelectorAll(cssSelector)
	    } else if (type === 'object') {

	    }
	}

	function define(config) {
	    var comp = {}
	    var el, selector, type
	    var isId = /^#[^ .\[\]]*$/
	    for (var name in config) {
	        selector = config[name]
	        type = typeof selector
	        el = null
	        if (type === 'string') {
	            if (assert.isLabelSelector(selector)) {
	                el = byLabel(selector)
	            } else if (isId.test(selector)) {
	                el = byId(selector.slice(1))
	            } else {
	                el = byCss(selector)
	                if (el.length === 0) el = null
	            }
	        } else if (type === 'object') {
	            if (assert.isElement(selector) || assert.isDomCollection(selector)) {
	                el = selector
	            } else {
	                el = define(selector)
	            }
	        }
	        comp[name] = el
	    }
	    return comp
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
	        return oneByCss(tag + exp)
	    } else if (tag.querySelector) {
	        return tag.querySelector(exp)
	    }
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
	    if(assert.isLabelSelector(text)){
	        text = text.slice(1)
	    }else{
	        return
	    }

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

	    byText: byText,
	    byLabel: byLabel,
	    define: define
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(8),
	    log = __webpack_require__(4).log,
	    by = __webpack_require__(2),
	    tag = __webpack_require__(7),
	    scope = __webpack_require__(6),
	    assert = __webpack_require__(1)

	var findOne = util.findOne,
	    isArray = util.isArray,
	    _getFieldType = util._getFieldType,
	    each = util.each

	function _getElByLabelOrName(el, labelTag) {
	    if (assert.isElement(el)) {
	        return el
	    }

	    if (assert.isLabelSelector(el)) {
	        return by.byLabel(el, [].concat(labelTag))
	    }

	    return by.oneByName(el)
	}

	function choose(labelOrName) {
	    var field = _getElByLabelOrName(labelOrName, 'input')
	    if (field && field.type === 'radio') {
	        field.checked = true
	    }
	}

	function check( /* label1, label2, ... */ ) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	        var labelOrName = arguments[i]
	        var field = _getElByLabelOrName(labelOrName, 'input')
	        if (field && field.type === 'checkbox') {
	            field.checked = true
	        }
	    }
	}

	function uncheck( /* label1, label2, ... */ ) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	        var labelOrName = arguments[i]
	        var field = _getElByLabelOrName(labelOrName, 'input')
	        if (field && field.type === 'checkbox') {
	            field.checked = false
	        }
	    }
	}

	function select(labelOrName, optionTextOrValue) {
	    var selectEl = _getElByLabelOrName(labelOrName, 'select')

	    if (selectEl) {
	        var options = selectEl.options
	        var i, l, option

	        if (selectEl.multiple) {
	            if (!util.isArray(optionTextOrValue)) {
	                return
	            }
	            var values = optionTextOrValue.map(function(item) {
	                return item.toString()
	            })

	            var isLabelSelector = assert.isLabelSelector(values[0])

	            for (i = 0, l = options.length; i < l; i++) {
	                option = options[i]
	                if (isLabelSelector) {
	                    if (values.indexOf('@' + option.text) !== -1) {
	                        option.selected = true
	                    }
	                } else {
	                    if (values.indexOf(option.value) !== -1) {
	                        option.selected = true
	                    }
	                }
	            }
	        } else {
	            for (i = 0, l = options.length; i < l; i++) {
	                option = options[i]
	                if (assert.isLabelSelector(optionTextOrValue)) {
	                    if ('@' + option.text === optionTextOrValue) {
	                        option.selected = true
	                        break
	                    }
	                } else {
	                    if (option.value === optionTextOrValue.toString()) {
	                        option.selected = true
	                        break
	                    }
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
	            el = _getElByLabelOrName(label)
	            if (el) {
	                if (el.tagName === 'SELECT') {
	                    select(el, value)
	                } else {
	                    el.value = value
	                }
	            } else { //单选钮组和复选钮组
	                var groupName = label
	                if (assert.isLabelSelector(label)) {
	                    var labelEl = by.byText('label', label.slice(1))
	                    groupName = labelEl.getAttribute('for')
	                }
	                if (groupName) { //兴趣： 唱歌，跳舞
	                    //假定单选钮组和复选钮组的组label的for设置为组元素的name
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
	                    var valueType = 'name'
	                    if (isCheckboxGroup) {
	                        if (!isArray(value)) {
	                            log(label + ' value should be a Array')
	                            continue
	                        } else {
	                            value = value.map(function(item) {
	                                return item.toString()
	                            })
	                            if (assert.isLabelSelector(value[0])) {
	                                valueType = 'label'
	                            }
	                        }
	                    } else {
	                        value = value.toString()
	                        if (assert.isLabelSelector(value)) {
	                            valueType = 'label'
	                        }
	                    }

	                    each(groupItems, function(groupEl, i) {
	                        var id = groupEl.id
	                        if (isCheckboxGroup) {
	                            if (valueType === 'label') {
	                                //通过id找到它对应的label
	                                var labelOfEl = by.byAttr('label', 'for', id)
	                                if (value.indexOf('@' + labelOfEl.textContent) !== -1) {
	                                    groupEl.checked = true
	                                }
	                            } else { // name
	                                if (value.indexOf(groupEl.value) !== -1) {
	                                    groupEl.checked = true
	                                }
	                            }
	                        } else { //radioGroup
	                            if (valueType === 'label') {
	                                var labelOfEl = by.byAttr('label', 'for', id)
	                                if ('@' + labelOfEl.textContent === value) {
	                                    groupEl.checked = true
	                                }
	                            } else { //name
	                                if (value == groupEl.value) {
	                                    groupEl.checked = true
	                                }
	                            }
	                        }
	                    })
	                }
	            }
	        }
	    })
	}

	function fillIn(labelOrName, value) {
	    var field = _getElByLabelOrName(labelOrName, ['input', 'textarea'])
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
	    var els
	    if (assert.isElement(name)) {
	        els = [name]
	    } else if (assert.isDomCollection(name)) {
	        els = name
	    } else {
	        els = by.byName(name)
	    }
	    var firstEl = els[0]

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
	        fn(wrapEl)
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
	var by = __webpack_require__(2)
	var assert = __webpack_require__(1)

	function field(labelOrName) {
	    if(assert.isLableSelector(labelOrName)){
	        var el = by.byLabel(labelOrName)
	    }else{
	        var el = by.oneByName(labelOrName)
	    }

	    if (assert.isField(el)) {
	        return el
	    }
	}

	function button(text) {
	    var selector = 'input[type=button][value=' + text + ']'
	    var inputBtn = by.oneByCss(selector)
	    if (inputBtn) {
	        return inputBtn
	    } else {
	        return by.byText('button', text)
	    }
	}

	function link(text) {
	    return by.byText('a', text)
	}

	function fieldset(text) {
	    return by.byText('legend', text)
	}

	function hidden(name) {
	    var selector = 'input[type=hidden][name=' + name + ']'
	    return by.oneByCss(selector)
	}

	function form(text) {
	    var fieldset = fieldset(text)
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
	    var el = by.byText('label', label)
	    if (el) { //兴趣： 唱歌，跳舞
	        //假定单选钮组和复选钮组的组label的for设置为组元素的name
	        var groupName = el.getAttribute('for')
	        return by.byName(groupName)
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

/***/ }
/******/ ])
});
;