const gulp = require('gulp')
const clean = require('gulp-clean');

gulp.task('clean-dist', () => {
  return gulp.src('dist', { read: false }).pipe(clean());
});

gulp.task('copy-api', ['clean-dist'], () => {
  return gulp.src('src/api/**/*.ts').pipe(gulp.dest('dist/api'));
});

gulp.task('copy-assets', ['copy-api'], () => {
  return gulp.src('src/assets/imgs/*').pipe(gulp.dest('dist/assets/imgs'));
});

gulp.task('copy-components', ['copy-assets'], () => {
  return gulp.src('src/components/**/*').pipe(gulp.dest('dist/components'));
});

gulp.task('copy-langs', ['copy-components'], () => {
  return gulp.src('src/lang/*.json').pipe(gulp.dest('dist/lang'));
});

gulp.task('copy-models', ['copy-langs'], () => {
  return gulp.src('src/models/**/*').pipe(gulp.dest('dist/models'));
});

gulp.task('copy-router', ['copy-models'], () => {
  return gulp.src('src/router/login-guard.ts').pipe(gulp.dest('dist/router'));
});

gulp.task('copy-store-types', ['copy-router'], () => {
  return gulp.src('src/store/types/login.ts').pipe(gulp.dest('dist/store/types'));
});

gulp.task('copy-store', ['copy-store-types'], () => {
  return gulp.src('src/store/modules-store/login.ts').pipe(gulp.dest('dist/store/modules-store'));
});

gulp.task('build-lib', ['copy-store'], (done) => {
  done();
})


