/*
常用文件 API 
  src 读取文件和文件夹    dest 生成文件    watch 监控文件    task  定制文件    pipe  使用流的方式处理文件
*/

 //引入模块
var gulp = require('gulp'),
     assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

var $ = require('gulp-load-plugins')(); 
var open = require('open');

var app = { //声明全局变量
  srcPath: 'src/', /*源文件*/
  devPath: 'build/', /*开发环境存在文件*/
  prdPath: 'dist/' /*打包压缩文件的目录*/
};


//定义css、js源文件路径
var cssSrc = 'src/style/*.css',
  jsSrc = 'src/script/*.js';
 
//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
  return gulp.src(cssSrc)  //该任务针对的文件
   .pipe(assetRev()) //该任务调用的模块
   .pipe(gulp.dest('src/rev/style')); //编译后css的路径
});
 
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('src/rev/style'));  // rev-manifest.json  文件存放路径
});
 
 
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('src/rev/script'));
});
 
 
//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src(['src/rev/**/*.json', 'src/*.html'])   // 源文件 json 和 html 
    .pipe(revCollector())
    .pipe(gulp.dest('src/rev'));  // 编译后的html文件路径 
});

// //开发构建
gulp.task('default', function (done) {
  condition = false;
  runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
    ['assetRev'],
    ['revCss'],
    ['revJs'],
    ['revHtml'],
    done);
});

// //拷贝文件 调用task（）函数  （gulp lib）
// gulp.task('html', function() {
//   gulp.src(app.srcPath + '**/*.html') /*读此文件下所有的html源文件*/
//   .pipe(gulp.dest(app.devPath)) /*将所读文件写入 build 目录下*/
//   .pipe(gulp.dest(app.prdPath)) /*将所读文件写入 dist 目录下*/
//   .pipe($.connect.reload()); /*浏览器实时预览 不支持ie8*/
// })

// gulp.task('css', function() {
//   gulp.src(app.srcPath + 'style/*.css')
//   .pipe(gulp.dest(app.devPath + 'style'))
//   .pipe($.cssmin()) /* 压缩css 文件*/
//   .pipe(gulp.dest(app.prdPath + 'style'))
//   .pipe($.connect.reload());
// });

// gulp.task('js', function() {
//   gulp.src(app.srcPath + 'script/**/*.js')
//   .pipe(gulp.dest(app.devPath + 'script'))
//   .pipe($.uglify()) /* 压缩js 文件*/
//   .pipe(gulp.dest(app.prdPath + 'script'))
//   .pipe($.connect.reload());
// });





// // 总任务，合并所有的任务 （gulp build）
// gulp.task('build', [ 'js', 'css', 'html','assetRev','revCss']);

// /*发布时清楚之前的压缩文件*/
// gulp.task('clean', function() {
//   gulp.src([app.devPath, app.prdPath])
//   .pipe($.clean()); /*清楚build和dist目录下的文件*/
// });

// //编写一个服务器
// gulp.task('serve', ['build'], function() {
//   $.connect.server({
//     root: [app.devPath],  /*默认冲开发环境中 build读取*/
//     livereload: true, 自动刷新浏览器 不支持ie
//     port: 3000 /*定义端口*/
//   });

//   // open('http://localhost:3000'); //服务器启动后自动打开新的端口

//   //实时监控
//   gulp.watch(app.srcPath + '**/*.html', ['html']);
//   gulp.watch(app.srcPath + 'style/**/*.css', ['css']);
//   gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
//   // gulp.watch(app.srcPath + 'image/**/*', ['image']);
// });

// //node中直接写 gulp  就会调用 gulp serve任务
// gulp.task('default', ['serve']);
