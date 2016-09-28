'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserify = require("browserify");
var babelify = require("babelify");
var fs = require("fs");
var clean = require('gulp-clean');
var connect = require('gulp-connect');

// html, css, js

gulp.task('html', function() {
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
	gulp.src('src/css/*.scss')
	.pipe(sass())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
	browserify('src/js/main.js')
	.transform(babelify, {
		presets: ['es2015']
	})
	.bundle()
	.pipe(fs.createWriteStream("dist/bundle.js"));
});

// build and clean

gulp.task('build', ['html', 'css', 'js']);

gulp.task('clean', function() {
	gulp.src(['dist/**/*.html', 'dist/styles.css', 'dist/bundle.js'], {
		read: false
	})
	.pipe(clean());
});

// serve

gulp.task('serve', function() {
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/css/*.scss', ['css']);
	gulp.watch('src/js/*.js', ['js']);
	connect.server({
		root: 'dist',
	});
});
