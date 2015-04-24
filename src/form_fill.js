var util = require('./util'),
    log = require('./log').log
    by = require('./by')
    tag = require('./tag_query')
    scope = require('./scope')

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