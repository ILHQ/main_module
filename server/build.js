/**
 * 打包时将各个应用打包的文件拷贝到一个文件夹中
 */

const fs = require('fs-extra');
const path = require('path');

const outputDir = 'dist_qiankun';// 打包后得文件名

function delDir (path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
// 删除文件
delDir(path.join(process.cwd(), outputDir));
// 拷贝文件
fs.copySync(path.join(process.cwd(), '../app1/dist_app1'), path.join(process.cwd(), outputDir, 'app1'));
fs.copySync(path.join(process.cwd(), './dist_main_module'), path.join(process.cwd(), outputDir, 'main_module'));
