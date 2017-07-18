var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function () {
    return gulp.src('dist/css/bundle.css')
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('concat-css', function () {
    return gulp.src('dist/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe( gulp.dest('dist/css'));
});

gulp.task('sass',['sass-lint'], function () {
    return gulp.src('src/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('index', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['index']);
});

gulp.task('sass-lint', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(sassLint({
            options: {
                formatter: 'stylish'
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('autoprefixer', function () {
    return gulp.src('./dist/css/main.css')
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-libraries', function () {
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('node_modules/jquery-lazyload/jquery.lazyload.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['vendor-libraries', 'index', 'sass', 'concat-css', 'minify-css']);