const gulp = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');
const del = require('del');
const nodemon = require('gulp-nodemon');
const jasMine = require('jasmine');
const gulpJasmine = require('gulp-jasmine');
const runSequence = require('run-sequence');

const configFile = 'tsconfig.json';
const tsProject = ts.createProject(configFile);
const distFolder = 'dist';

const clearBuild = () => del.sync([distFolder]);

gulp.task('build', (cb) => {
	//clearBuild();
	return tsProject.src()
									.pipe(tsProject())
									.js.pipe(gulp.dest(distFolder));
});

gulp.task('clear-build', () => {
	return clearBuild();
});

const onChangeLog = (e) => {
	let fileName = <string>e.path;
	fileName = fileName.substr(fileName.indexOf('lavauth'));
	console.log(`file ${fileName} was ${e.type}, running tasks...`);
};

gulp.task('build:watch', () => {
	const buildWatcher = gulp.watch('src/**/*.ts', ['build']);
	buildWatcher.on('change', onChangeLog);
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

gulp.task('test:throw', () => {
	gulp.src('dist/**/*[sS]pec.js')
			.pipe(gulpJasmine());
});

gulp.task('dev', () => {
	clearBuild();
	const buildWatcher = gulp.watch('src/**/*.ts', runSequence('build', 'test'));
	buildWatcher.on('change', (e) => {
		onChangeLog(e);
		runSequence('build', 'test');
	});
});

