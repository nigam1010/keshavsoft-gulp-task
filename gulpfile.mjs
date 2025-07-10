// gulpfile.mjs
import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import { deleteSync } from 'del';

const bs = browserSync.create();
const sassCompiler = gulpSass(dartSass);

// Home page
const buildHome = () =>
  gulp.src('src/index.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: { page: 'home' }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream());

// About page
const buildAbout = () =>
  gulp.src('src/about.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: { page: 'about' }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream());

// Contact page
const buildContact = () =>
  gulp.src('src/contact.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: { page: 'contact' }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream());

// All HTML pages
export const html = gulp.parallel(buildHome, buildAbout, buildContact);

// SCSS Compilation
export const css = () =>
  gulp.src('src/scss/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(bs.stream());

// Clean `dist`
export const clean = (done) => {
  deleteSync(['dist']);
  done();
};

// Dev Server + Watch
export const serve = () => {
  bs.init({ server: { baseDir: 'dist' }, port: 8080 });
  gulp.watch('src/**/*.html', html);
  gulp.watch('src/partials/**/*.html', html);
  gulp.watch('src/scss/**/*.scss', css);
};

// Default task
export default gulp.series(clean, gulp.parallel(html, css), serve);

//sidebar
const buildSidebar = () =>
  gulp.src('src/partials/sidebar.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: { page: 'sidebar' }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream());

export const buildAllHtml = gulp.parallel(buildHome, buildAbout, buildContact, buildSidebar);

