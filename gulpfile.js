'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    brSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('app/scss/**/*style.scss')
        .pipe(sourcemaps.init())        // активируем gulp-sourcemaps
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.write())   // создание карты css.map в текущей папке
        .pipe(gulp.dest('dist/css'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('brSync', () => {
    brSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
});

gulp.task('html', () => {
    return gulp.src('app/**/*.html', { since: gulp.lastRun('html') })
        .pipe(gulp.dest('dist'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('images', () => {
  return gulp.src('app/img/**') // Берём все изображения из папки источника // Проверяем, было ли изменено (сжато) изображение ранее
  .pipe(gulp.dest('dist/img/')) // Выгружаем оптимизированные изображения в папку назначения
});

function images() {
	return src('app/img/**') // Берём все изображения из папки источника // Проверяем, было ли изменено (сжато) изображение ранее
	.pipe(imagemin()) // Сжимаем и оптимизируем изображеня
	.pipe(dest('dist/img/')) // Выгружаем оптимизированные изображения в папку назначения
}

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('app/**/*.scss', gulp.parallel('sass')); // следим за изменениями SASS
    gulp.watch('app/**/*.html', gulp.parallel('html'))     // следим за изменениями HTML
    gulp.watch('app/img/**/*', gulp.parallel('images'));
}));

gulp.task('default', gulp.parallel('sass', 'html', 'images', 'watch'));
