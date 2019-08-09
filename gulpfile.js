const {
  src, dest, watch, parallel,
} = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();

function browserSync() {
  return bs.init({
    server: {
      baseDir: './public/',
    },
    port: 8081,
  });
}

function CompileSass() {
  return src('./public/styles/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(dest('./public/styles/'))
    .pipe(bs.stream());
}

function watchFiles() {
  watch('./public/styles/**/*.scss', CompileSass);
  watch(['./public/*.html']).on('change', bs.reload);
}

exports.default = parallel(browserSync, watchFiles);
