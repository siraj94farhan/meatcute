import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import gulpIf from 'gulp-if';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!build/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './.env', './**/*.html', './Dockerfile', 'yarn.lock', '.babelrc', 'README.md', './**/*.png'],
};

// Clean up build and coverage directory
gulp.task('clean', () =>
  del.sync(['build/**', 'build/.*'])
);

// eslint --fix.
gulp.task('lint:fix', () => {
  function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
  }

  /*
   * After formatting, save fixed contents
   * to the destination
   */
  gulp.src(['./config/**/*.js'])
    .pipe(plugins.eslint({
      fix: true,
    }))
    .pipe(plugins.eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./config')));

  gulp.src(['./server/**/*.js'])
    .pipe(plugins.eslint({
      fix: true,
    }))
    .pipe(plugins.eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./server')));

  gulp.src(['./*.js'])
    .pipe(plugins.eslint({
      fix: true,
    }))
    .pipe(plugins.eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
});

// Copy non-js files to build
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('build'))
    .pipe(gulp.dest('build'))
);

// Compile ES6 to ES5 and copy to build
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('build'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel({ plugins: ['transform-runtime'] }))
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      },
    }))
    .pipe(gulp.dest('build'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['lint:fix', 'copy', 'babel'], () =>
  plugins.nodemon({
    script: path.join('build', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'build/**/*.js'],
    tasks: ['copy', 'babel'],
  })
);

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// build for production
gulp.task('build', ['clean'], () => {
  runSequence(
    ['copy', 'babel']
  );
});

// default task: clean build, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'babel']
  );
});
