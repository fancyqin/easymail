var gulp = require('gulp');

var contentInclude = require('gulp-content-includer');
var rename = require('gulp-rename');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return sass('src/scss/**/*.scss',{sourcemap:true})
        .on('error', sass.logError)
        // For inline sourcemaps
        .pipe(sourcemaps.write())

        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('src/css'));
});



gulp.task('concat',function() {
    gulp.src("dev_page/**/[!_]*.html")
        .pipe(contentInclude({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('page/'));
});

gulp.task('watch', function () {
    gulp.watch(['src/scss/*scss','dev_page/**/*.html'], ['sass','concat']);
});