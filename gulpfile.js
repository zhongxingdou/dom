var gulp = require('gulp')
var watch = require('gulp-watch')
var webpack = require('webpack')
var gulp_webpack = require('gulp-webpack')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['build'])
})

gulp.task('w', ['build', 'watch'])

var fs = require('fs')
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

var banner =
    '/**\n' +
    ' * Dom.js v' + pkg.version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' Hal Zhong\n' +
    ' * Released under the MIT License.\n' +
    ' */\n'

gulp.task('build', function() {
    return gulp.src('src/dom.js')
        .pipe(gulp_webpack({
            output: {
                filename: 'dom.js',
                library: 'Dom',
                libraryTarget: 'umd'
            },
            plugins: [
                new webpack.BannerPlugin(banner, {
                    raw: true
                })
            ]
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/'))
})
