var util = require('./util'),
    log = require('./log').log,
    by = require('./by'),
    tag = require('./tag_query'),
    scope = require('./scope'),
    assert = require('./assertion')

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