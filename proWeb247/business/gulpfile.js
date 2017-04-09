var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'planer-icons';

gulp.task('iconfont', function(){
    gulp.src(['dist/img/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'dist/templates/_icons.scss',
            targetPath: '../../dist/sass/_planer-icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest('app/fonts/'));
});

gulp.task('sass', function () {
  return gulp.src('dist/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions','>1%','ie 9']))
    .pipe(gulp.dest('app/css'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('dist/img/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../img/sprite.png',
    }));

    var imgStream = spriteData.img
    .pipe(gulp.dest('app/img/'));
 
    var cssStream = spriteData.css
    .pipe(gulp.dest('dist/sass/'));

    return merge(imgStream, cssStream);
});

gulp.task('watch', ['sass'], function(){
	gulp.watch('dist/sass/**/*.scss', ['sass']);
})