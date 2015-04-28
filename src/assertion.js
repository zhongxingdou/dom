var util = require('./util')
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