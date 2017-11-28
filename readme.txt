
gulp 代码压缩 和添加版本号

/*src 目录为源码， build 用于调试，dist 为打包后文件 */


1. 本文件无需部署

2. 先安装 package.json 中的node模块 npm install

可能需要全局安装 gulp，即 

npm i -g gulp

3. 开发时需要启动 gulp 任务

监听代码并事实行编译   gulp




修改版本号 ： （修改 1 .3 即可）


1、打开node_modules\gulp-rev\index.js

第144行 manifest[originalFile] = revisionedFile; 更新为: 
manifest[originalFile] = originalFile + ‘?v=’ + file.revHash;

2、打开nodemodules\gulp-rev\nodemodules\rev-path\index.js

10行 return filename + ‘-’ + hash + ext;
更新为: return filename + ext;

3、打开node_modules\gulp-rev-collector\index.js

31行if ( !_.isString(json[key]) ||path.basename(json[key]).replace(new RegExp( opts.revSuffix ), ” )
更新为: if ( !_.isString(json[key]) || path.basename(json[key]).split(‘?’)[0] !== path.basename(key) ) { 
可能你会找不到这一句没关系，把40行按下修改
 let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );
 修改为：
 let cleanReplacement =  path.basename(json[key]).split('?')[0];
