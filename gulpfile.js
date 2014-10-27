(function() {

    var gulp     = require('gulp'),
        jshint   = require('gulp-jshint'),
        react    = require('gulp-react'),
        clean    = require('gulp-clean'),
        filename = 'Recipes.jsx',
        path     = 'example/js/app/' + filename;

    gulp.task('jsx', function gulpJSX() {
        return gulp.src(path)
            .pipe(react())
            .pipe(gulp.dest('tmp'));
    });

    gulp.task('hint', ['jsx'], function gulpHint() {
        return gulp.src('tmp/' + filename)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
    });

    gulp.task('clean', ['hint'], function gulpClean() {
        return gulp.src('tmp')
            .pipe(clean({force: true}));
    });

    gulp.task('test', ['jsx', 'hint', 'clean']);
    gulp.task('default', ['test']);

})();