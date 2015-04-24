function findControlLabel(controlId) {
    var labels = document.getElementsByTagName("Label")
    for (var i = 0, l = labels.length; i < l; i++) {
        var aLabel = labels[i]
        if (aLabel.getAttribute("for") === controlId) {
            return aLabel.innerText
        }
    }
}

function getChoosedOf(labelText) {
    var radios = findControl(labelText)
    for (var i = 0, l = radios.length; i < l; i++) {
        var aRadio = radios[i]
        if (aRadio.checked) {
            return findControlLabel(aRadio.id)
        }
    }
}

function getSelectedOf(labelText) {
    var select = findControl(labelText)
    if (select) {
        var options = select.options
        if (select.multiple) {
            var selected = []
            for (var i = 0, l = options.length; i < l; i++) {
                var aOption = options[i]
                if (aOption.selected) {
                    selected.push(Option.text)
                }
            }
            return selected
        } else {
            for (var i = 0, l = options.length; i < l; i++) {
                var aOption = options[i]
                if (aOption.selected) {
                    return aOption.text
                }
            }
        }
    }
}

function getCheckedOf(labelText) {
    var checkboxes = findControl(labelText)
    var checked = []
    for (var i = 0, l = checkboxes.length; i < l; i++) {
        var aCheckbox = checkboxes[i]
        if (aCheckbox.checked) {
            checked.push(findControlLabel(aCheckbox.id))
        }
    }
    return checked
}


function getValueByLabel(labelText) {
    var control = findControl(labelText)
    if (_isArray(control)) {
        var controls = control
        var values = []
        for (var i = 0, l = controls.length; i < l; i++) {
            values.push(controls[i].value)
        }
        return values
    } else {
        return control.value
    }
}

function getValueByName(name) {
    var controls = document.getElementsByName(name)
    if (controls.length > 0) {
        var type = controls[0].type
        if (type === "radio") {
            for (var i = 0, l = controls.length; i < l; i++) {
                var aRadio = controls[i]
                if (aRadio.checked) {
                    return aRadio.value
                }
            }
        } else if (type === "checkbox") {
            var values = []
            for (var i = 0, l = controls.length; i < l; i++) {
                var aCheckbox = controls[i]
                if (aCheckbox.checked) {
                    values.push(aCheckbox.value)
                }
            }
            return values
        } else {
            return controls[0].value
        }
    }
}

var _alias = {}

function alias(element, name) {
    _alias.name = element
}

function clearAlias(name) {
    delete _alias.name
}