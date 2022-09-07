const { not } = require("micromatch");

let gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  prefix = require("gulp-autoprefixer"),
  pug = require("gulp-pug"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  zip = require("gulp-zip"),
  livereload = require("gulp-livereload");

// start html task
gulp.task("html", async function () {
  return (
    gulp
      .src("./project/pug/index.pug")
      .pipe(plumber())
      .pipe(pug({ pretty: true }))
      .pipe(gulp.dest("dist/client"))
      // .pipe(notify("HTML Changed..."))
      .pipe(livereload())
  );
});

// start css task
gulp.task("css", async function () {
  return gulp
    .src("./project/css/banklist.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix("last 2 version"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/client/css"));
  // .pipe(notify("CSS Changed..."));
});

// start js task
gulp.task("js", async function () {
  return gulp
    .src("./project/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("banklist.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/client/js"));
  // .pipe(notify("JS Code Changed..."));
});

// start compress task
gulp.task("compress", async function () {
  return gulp
    .src("dist/client/**/*.*")
    .pipe(zip("Site.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("The Project Was Compressed..."));
});

// start important task (watch files)
gulp.task("watch", async function () {
  livereload.listen();
  gulp.watch("project/pug/**/*.pug", gulp.series("html"));
  gulp.watch("project/css/**/*.scss", gulp.series("css"));
  gulp.watch("project/js/*.js", gulp.series("js"));
  gulp.watch("dist/client/**/*.*", gulp.series("compress"));
});

// default function task
gulp.task("default", gulp.series("watch"));
