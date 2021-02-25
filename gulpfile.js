
const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        browserSync = require('browser-sync'),
        autoPrefixer = require('gulp-autoprefixer'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        cssmin = require('gulp-cssmin');

gulp.task('sass', function() {
    return  gulp.src('app/scss/style.scss') //Папка откуда все будет компилироваться
            .pipe(sass({outputStyle: 'compressed'})) //Запуск препроцесора sass
            .pipe(rename({suffix: '.min'})) //Переименнование файлов с префиксом .min
            .pipe(autoPrefixer({
                overrideBrowserslist: ['last 8 version']
            })) //Добавляем префиксы для работы в разных браузерах
            .pipe(gulp.dest('app/css')) //Папка куда все компилируется
            .pipe(browserSync.reload({stream: true})); //Следим за файлами scss
});

gulp.task('style', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css', //Получаем css-плагины
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/chartist/dist/chartist.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
        'node_modules/chart.js/dist/Chart.css'
        // 'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(concat('libs.min.css'))// объединяем файлы js полученные выше
    .pipe(cssmin())
    .pipe(gulp.dest('app/css')); //Выкидываем в папку js, которая создасться автоматически
});

gulp.task('script', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js', //Получаем js-плагины
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/chartist/dist/chartist.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'node_modules/chart.js/dist/Chart.js'
        // 'node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat('libs.min.js'))// объединяем файлы js полученные выше
    .pipe(uglify()) //Минифицируем js файлы
    .pipe(gulp.dest('app/js')); //Выкидываем в папку js, которая создасться автоматически
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app/' // Показываем браузеру за какой папкой мы следим
        }
    });
});

gulp.task('watch', function() {
        gulp.watch('app/scss/style.scss', gulp.parallel('sass'));
        gulp.watch('app/*.html', gulp.parallel('html'));
        gulp.watch('app/js/*.js', gulp.parallel('js'));

});

gulp.task('default', gulp.parallel( 'script', 'style', 'sass', 'watch', 'browser-sync')); //Запускаем все нужные таски паралельно
