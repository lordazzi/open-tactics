const gulp = require('gulp');
const tar = require('gulp-tar');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('transpile', () => tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('packagify', ['transpile'], () => gulp.src('dist/**')
    .pipe(gulp.dest('package/package'))
);

gulp.task('compress', ['packagify'], () => gulp.src(['package/**', 'package.json'])
    .pipe(tar('open-tactics-core.1.0.0.tar'))
    .pipe(gulp.dest('./'))
);

gulp.task('clean', ['compress'], () => gulp.src([
    'dist', 'package'
]).pipe(clean()));

gulp.task('generate-package', ['clean']);
