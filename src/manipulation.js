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