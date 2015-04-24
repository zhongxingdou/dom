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