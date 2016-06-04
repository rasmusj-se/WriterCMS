var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');
var server = require('gulp-server-livereload');

gulp.task('bower', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/*.min.*',
                        './dist/fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(gulp.dest('./public/lib'));
});

gulp.task('bower-inject', ['bower'], function() {
    // Force jQuery to load before other libs, given dependency problems
    var sources = gulp.src(['./public/lib/jquery.js', './public/lib/**/*.js', './public/lib/**/*.css'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true, name: 'bower'}))
        .pipe(gulp.dest('./public'));
});

gulp.task('js-inject', function() {
    var sources = gulp.src(['./public/js/**/*.js'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public'));
});

gulp.task('inject', ['js-inject', 'bower-inject']);

gulp.task('default', function() {
    gulp.watch('./public/js/**/*.js', ['js-inject']);

    return gulp.src('./public')
        .pipe(server({
            livereload: true,
            host: '0.0.0.0'
        }));
});