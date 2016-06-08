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
                        './dist/css/*.*',
                        './dist/fonts/*.*'
                    ]
                },
                'blueimp-load-image': {
                    main: [
                        './js/load-image.all.js'
                    ]
                },
                'font-awesome': {
                    main: [
                        './css/font-awesome.css',
                        './fonts/**/*'
                    ]
                }
            }
        }))
        .pipe(gulp.dest('./public/lib'));
});

gulp.task('lib-inject', ['bower'], function() {
    // Font awesome
    gulp.src('./public/lib/font-awesome/**/*')
        .pipe(gulp.dest('./public'));

    // Force jQuery to load before other libs, given dependency problems
    var sources = gulp.src(['./public/lib/jquery.js', './public/lib/**/*.js', './public/lib/**/*.css'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true, name: 'bower'}))
        .pipe(gulp.dest('./public'));
});

gulp.task('js-inject', function() {
    var sources = gulp.src(['public/js/lib/**/*.js', 'public/js/app.js', './public/js/**/*.js'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public'));
});

gulp.task('styles-inject', function() {
    var sources = gulp.src(['./public/css/**/*.css'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public'));
});

gulp.task('inject', ['js-inject', 'lib-inject', 'styles-inject']);

gulp.task('default', ['inject'], function() {
    gulp.watch('./public/js/**/*.js', ['js-inject']);
    gulp.watch('./public/css/**/*.css', ['styles-inject']);
    gulp.watch('./bower_components/**/*', ['lib-inject']);

    return gulp.src('./public')
        .pipe(server({
            livereload: true,
            host: '0.0.0.0'
        }));
});