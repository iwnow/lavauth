const gulp = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');
const del = require('del');
const nodemon = require('gulp-nodemon');
const jasMine = require('jasmine');
const gulpJasmine = require('gulp-jasmine');

const configFile = 'tsconfig.json';
const tsProject = ts.createProject(configFile);
const distFolder = 'dist';

const clearBuild = () => del.sync([distFolder]);

gulp.task('build', () => {
	return tsProject.src()
									.pipe(tsProject())
									.js.pipe(gulp.dest(distFolder));
});

gulp.task('clear-build', () => {
	return clearBuild();
});

gulp.task('build:watch', () => {
	const buildWatcher = gulp.watch('src/**/*.ts', ['build']);
	buildWatcher.on('change', (e) => {
		let fileName = <string>e.path;
		fileName = fileName.substr(fileName.indexOf('lavauth'));
		console.log(`file ${fileName} was ${e.type}, running tasks...`);
	});
});

gulp.task('serve', () => {
	nodemon({
		script: 'dist/index.js',
		ext: 'js',
		env: { ['NODE_ENV']: 'development' }
	});
});

gulp.task('test', () => {
	gulp.src('dist/**/*[sS]pec.js')
			.pipe(gulpJasmine({
				verbose: false
			}))
			.on('error', (e) => { console.error(e.message); });
});

gulp.task('test:watch', () => {
	const buildWatcher = gulp.watch('dist/**/*spec.js', ['test']);
	buildWatcher.on('change', (e) => {
		let fileName = <string>e.path;
		fileName = fileName.substr(fileName.indexOf('lavauth'));
		console.log(`file ${fileName} was ${e.type}, running tasks...\n`);
	});
});

gulp.task('dev', ['build:watch']);
gulp.task('dev-serve', ['dev', 'serve']);
gulp.task('dev-test', ['dev', 'test:watch']);

