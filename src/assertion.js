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


module.exports = {
    isField: isField,
    isButton: isButton
}