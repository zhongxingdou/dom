var util = require('./util')
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