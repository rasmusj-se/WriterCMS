var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

gulp.task('lib', ['bower'], function() {
    gulp.src('./public/lib/**/*.js')
        .pipe(concat('lib_scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));

    gulp.src('./public/lib/**/*.css')
        .pipe(concat('lib_styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('lib-inject', ['lib'], function() {
    var sources = gulp.src(['./public/dist/lib_scripts.js', './public/dist/lib_styles.css']);
    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('js', function() {
    return gulp.src(['public/js/lib/**/*.js', 'public/js/app.js', './public/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('js-inject', ['js'], function() {
    return gulp.src('./public/index.html')
        .pipe(inject(gulp.src('./public/dist/scripts.js'), {relative: true}))
        .pipe(gulp.dest('./public'));
});

/* Build, concatenate and minify all SASS files */
gulp.task('styles', function() {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('styles-inject', ['styles'], function() {
    return gulp.src('./public/index.html')
        .pipe(inject(gulp.src('./public/dist/*.css'), {relative: true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('inject', function() {
    var sources = gulp.src(['./public/dist/lib_styles.css', './public/dist/lib_scripts.js',
        './public/dist/styles.css', './public/dist/scripts.js'], {read: false});

    return gulp.src('./public/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public'));
});

gulp.task('default', ['inject'], function() {
    gulp.watch('./public/js/**/*.js', ['js', 'inject']);
    gulp.watch('./public/sass/**/*.scss', ['inject']);
    gulp.watch('./bower_components/**/*', ['inject']);

    return gulp.src('./public')
        .pipe(server({
            livereload: true,
            host: '0.0.0.0'
        }));
});

gulp.task('build', ['lib', 'js', 'styles', 'inject']);
