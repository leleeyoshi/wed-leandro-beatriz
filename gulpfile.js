const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const wait = require('gulp-wait');
const url = require('url');
const proxy = require('proxy-middleware');
const autoprefixer = require('gulp-autoprefixer');


const cachebust = require('gulp-cache-bust');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

// TAREFA PARA TRANSFORMAR TODOS ESTILOS SASS EM CSS
gulp.task('sass', function() {
    return gulp.src(
            [
                './app/styles/*.scss',
                './app/styles/common/font-awesome.css'
            ]
        ).pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 10 versions'], cascade: true }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/static/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.babel())
        .pipe($.if(dev, $.sourcemaps.write('.')))
        .pipe(gulp.dest('dist/static/scripts'))
        .pipe(reload({ stream: true }));
});

function lint(files) {
    return gulp.src(files)
        .pipe($.eslint({ fix: true }))
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/scripts/**/*.js')
        .pipe(gulp.dest('app/scripts'));
});


gulp.task('html', ['sass', 'scripts'], () => {
    return gulp.src('app/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
        .pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
        .pipe($.if(/\.html$/, $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: { compress: { drop_console: true } },
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(cachebust({
            type: 'timestamp'
          }))

        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/static/images'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/font/**/*'))
        .pipe(gulp.dest('dist/static/font'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.txt',
        'app/**/*.json',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});


gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['scripts', 'fonts', 'sass', 'images'], () => {
        browserSync.init({
            server: {
                baseDir: ['dist', 'app']
            }
        });

        gulp.watch([
            'app/*.html',
            'app/images/**/*',
            'dist/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('app/styles/**/*.scss', ['sass']);
        gulp.watch('app/scripts/**/*.js', ['scripts']);
        gulp.watch('app/font/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.scss')
        .pipe($.filter(file => file.stat && file.stat.size))
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('prod', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'prod', gzip: true }));
});

gulp.task('build', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean', 'wiredep'], 'prod', resolve);
    });
});
