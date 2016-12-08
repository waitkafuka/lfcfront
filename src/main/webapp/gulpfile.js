var gulp = require('gulp'),
    lr = require('tiny-lr'),
    clean = require('gulp-clean'),
    server = lr(),
    webserver  = require('gulp-webserver'),
    minifycss = require('gulp-minify-css'),
    htmlmni = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    config     = require('./configs.json'),
    fileinclude = require('gulp-file-include'),
    gulpSequence = require('gulp-sequence');
    include = require('gulp-file-include');

gulp.task('minifycss',function () {
    gulp.src('release/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('uglify',function () {
    gulp.src('release/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
gulp.task('htmlmin',function () {
    var options = {
        collapseWhitespace:true,
        collapseBooleanAttributes:true,
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyJS:true,
        minifyCSS:true
    };
    gulp.src('release/*.html')
        .pipe(htmlmni(options))
        .pipe(gulp.dest('dist'))
});
gulp.task('webserver', function() {
    gulp.src( './release' )
        .pipe(webserver({
            host:             config.localserver.host,
            port:             config.localserver.port,
            livereload:       true,
            directoryListing: false
        }));
});
gulp.task('copy', function() {
    //根目录文件
    gulp.src('./dev/images/*')
        .pipe(gulp.dest('./dist/images'));
    gulp.src('./dev/data/**/*')
        .pipe(gulp.dest('./dist/data'));
    gulp.src('./dev/font/**/*')
        .pipe(gulp.dest('./dist/font'))
});
gulp.task('include',function () {
    gulp.src(['dev/**/*.html','!dev/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist'));
})
//通过浏览器打开本地 Web服务器 路径
// gulp.task('openbrowser', function() {
//     opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
// });
gulp.task('devcopy', function() {
    gulp.src(['dev/**/*', '!./dev/pages/**/*'])
        .pipe(gulp.dest('./release/'));

});
//将公用资源引用添加至业务html文件中
gulp.task('include_dev', function() {
     gulp.src(['dev/pages/**/*'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./release/pages/'));
});
////将相关项目文件复制dist文件夹下
gulp.task('distcopy', function() {
    //根目录文件
    gulp.src(['dev/**/*', '!dev/*.html','!dev/js/**/*','!dev/css/**'])
        .pipe(gulp.dest('dist/'))
});

// gulp.task('default',['watch','webserver']);
//文件监控
gulp.task('watch', function () {
    server.listen(35729, function (err) {
        if (err){
            return console.log(err);
        }
    });
    gulp.watch('dev/**/*',['devcopy','include_dev']);
    gulp.watch(['dev/*.html','dev/*.css','dev/js/*.js'],  function (e) {
        server.changed({
            body: {
                files: [e.path]
            }
        });
    });
});

//清除release目录
gulp.task('clean_release', function() {
  return gulp.src(['./release/'], {
      read: false
    })
    .pipe(clean({
      force: true
    }))
    .pipe(clean());
});
//开发式执行的任务
gulp.task('develop', gulpSequence('clean_release','devcopy','include_dev','webserver','watch'));
//开发完成执行的任务
gulp.task('build',gulpSequence('distcopy','minifycss','uglify','htmlmin'));


