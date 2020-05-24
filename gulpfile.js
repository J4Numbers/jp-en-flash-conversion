/*
 * MIT License
 *
 * Copyright (c) 2020 J4Numbers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const gulp = require('gulp');
const npath = require('path');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

/* ----------------------------------------------------------------- GLOBALS */

const babelDir = './src/javascript/**/*.js';
const fontDir = './src/fonts/**/*.{woff,woff2}';
const imageDir = './src/images/**/*.{png,ico,gif,jpg,svg}';
const sassDir = './src/stylesheets/**/*.scss';
const destDir = './public/';
const destBabelDir = `${destDir}javascript`;
const destFontDir = `${destDir}fonts`;
const destImageDir = `${destDir}images`;
const destSassDir = `${destDir}stylesheets`;

/* ------------------------------------------------------------------- CLEAN */

gulp.task('clean', () => gulp
    .src([destDir], { read: false, allowEmpty: true })
    .pipe(clean()));

/* ------------------------------------------------------------------ ASSETS */

gulp.task('sass', () => gulp
    .src([sassDir])
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed',
        indentedSyntax: false,
    }).on('error', sass.logError))
    .pipe(gulp.dest(destSassDir)));

gulp.task('babel', () => gulp
    .src([babelDir])
    .pipe(babel({
        presets: ['@babel/env'],
    }))
    .pipe(gulp.dest(destBabelDir)));

gulp.task('copy-fonts', () => gulp
    .src([fontDir])
    .pipe(gulp.dest(destFontDir)));

gulp.task('copy-images', () => gulp
    .src([imageDir])
    .pipe(gulp.dest(destImageDir)));

// gulp.task('copy-scripts', () => gulp
//     .src([])
//     .pipe(gulp.dest(destBabelDir)));

/* ------------------------------------------------------------------- TASKS */

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'babel'),
    gulp.parallel('copy-fonts', 'copy-images')));

gulp.task('default', gulp.series('build'));
