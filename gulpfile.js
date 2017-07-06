/**
 * GulpFile的目的是保证目录的一致性
 */
const gulp = require("gulp");
const ts = require('gulp-typescript');
const path = require("path");
const src = path.join(__dirname, "src");
const build = path.join(__dirname, "build");
const colors = require("colors");
const watch = require("gulp-watch");
const rimraf = require("rimraf");
const replaceExt = require('replace-ext');
const tsProject = ts.createProject('tsconfig.json');
gulp.task("default", ["rm"], function() {
    console.log("开始编译");
    // 根据不同的路径去进行分类
    gulp.src(path.join(src, "**/**.ts"))
        .pipe(tsProject())
        .pipe(gulp.dest(build));
});
gulp.task("rm", async function(cb) {
    cb = cb || function() {};
    console.log("即将删除:".green, build.yellow);
    rimraf.sync(build);
    console.log("删除成功".green);
})
gulp.task("watch", function() {
    watch(path.join(src, "**/**"), function(folder, option) {
        let date = new Date();
        console.log(`[${date.toLocaleString().cyan}]  ${path.relative(src,folder.path).yellow}  ${folder.event}`);
        // 根据后缀去进行不同的解析
        let extname = path.extname(folder.path);
        if (extname == ".ts") {
            if (folder.event == "change" || folder.event == "add") {
                gulp.src(folder.path)
                    .pipe(tsProject())
                    .pipe(gulp.dest(function(_folder) {
                        _folder.base = folder.base;
                        return build;
                    }))
            }
            if (folder.event == "unlink") {
                let relative = path.relative(src, folder.path);
                let buildPath = path.join(build, replaceExt(relative, ".js"));
                let builddPath = path.join(build, replaceExt(relative, ".d.ts"));
                rimraf(buildPath, function() {
                    console.log(buildPath.blue, "删除完毕".green);
                });
                rimraf(builddPath, function() {
                    console.log(builddPath.blue, "删除完毕".green);
                });
            }
        } else {
            // 直接移动
            if (folder.event == "change" || folder.event == "add") {
                gulp.src(folder.path)
                    .pipe(gulp.dest(function(_folder) {
                        _folder.base = folder.base;
                        return build;
                    }))
            }
            if (folder.event == "unlink") {
                let relative = path.relative(src, folder.path);
                let buildPath = path.join(build, relative);
                rimraf(buildPath, function() {
                    console.log(buildPath.blue, "删除完毕".green);
                });
            }
        }

    });
});