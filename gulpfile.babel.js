import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
import image from "gulp-image";

sass.compiler = require("node-sass");

const routes = {
  scss: {
    src: "src/scss/style.scss",
    dest: "dist/css",
    watch: "src/scss/*",
  },
  img: {
    src: "src/img/*",
    dest: "dist/img",
  },
};

const clean = () => del("dist");

const watch = () => {
  gulp.watch(routes.scss.watch, scss);
};

const scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.scss.dest));

const img = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const prepare = gulp.series([clean]);

const assets = gulp.series([scss, img]);

const live = gulp.series([watch]);

export const dev = gulp.series([prepare, assets, live]);
