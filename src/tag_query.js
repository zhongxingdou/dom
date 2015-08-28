var util = require('./util')
var findOne = util.findOne
var by = require('./by')
var assert = require('./assertion')

function field(labelOrName) {
    var el
    if(assert.isLableSelector(labelOrName)){
        el = by.byLabel(labelOrName)
    }else{
        el = by.oneByName(labelOrName)
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

/**
 * Dom.row(table, 3)
 * Dom.row(table, [1, 3, 5])
 * Dom.row(table, 'odd')
 * Dom.row(table, 'even')
 * Dom.row(table, function(row, i) {
 *   return i % 3 === 0  
 * })
 */
function row(table, where) {
    if(typeof where === 'number') {
        return table.rows[where]
    }

    if (Array.isArray(where)) {
        return where.map(function(i) {
            return table.rows[i]
        })
    }

    if(typeof where === 'string') {
        var i = 0,
            l = table.rows.length,
            rows = []
        switch(where) {
            case 'odd':
                while(i < l) {
                    if((i+1) % 2 === 1) {
                        rows.push(table.rows[i])
                    }
                    i++
                }
                return rows
            case 'even':
                while(i < l) {
                    if((i+1) % 2 === 0) {
                        rows.push(table.rows[i])
                    }
                    i++
                }
                return rows
        }
    }

    if(typeof where === 'function') {
        var rows2 = [], tr
        for(var j=0, k=table.rows.length; j<k; j++) {
            tr = table.rows[j]
            if(where(tr, j)) {
                rows2.push(tr)
            }
        }
        return rows2
    }
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
    row: row,
    cell: cell,
    group: group
}