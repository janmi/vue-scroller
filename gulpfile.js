var gulp = require('gulp'),
    less = require('gulp-less'),
    pulmber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require("browser-sync");

gulp.task('less', function() {
    gulp.src('src/assets/less/**/*.less')
        .pipe(pulmber())
        .pipe(changed('src/assets/css', {
            extension: '.css'
        }))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['less'], function() {
    gulp.watch('src/assets/less/**/*.less', ['less']);
});

gulp.task('server', function () {
    browserSync.init({
        file: '*',
        server: {
            baseDir: '.'
        }
    })
    // gulp.watch('*.html').on('change', browserSync.reload);
})