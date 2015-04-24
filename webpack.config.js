var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var webpack = require('webpack')
var banner =
    '/**\n' +
    ' * Dom.js v' + pkg.version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' Hal Zhong\n' +
    ' * Released under the MIT License.\n' +
    ' */\n'

module.exports = {
    entry: './src/dom.js',
    output: {
        path: './dist',
        filename: "dom.js",
        library: 'Dom',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin(banner, {
            raw: true
        })
    ]
}