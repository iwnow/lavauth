import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as fs from 'fs';

const del = require('del');

const configFile = 'tsconfig.json',
			tsProject = ts.createProject(configFile),
			distFolder = 'dist';

gulp.task('build', () => {
	clearBuild();
	return tsProject.src()
									.pipe(tsProject())
									.js.pipe(gulp.dest(distFolder));
});

const clearBuild = () => del.sync([distFolder]);
gulp.task('clear-build', () => {
	return clearBuild();
});

gulp.task('build:watch', () => {
	const buildWatcher = gulp.watch('src/**/*.ts', ['build']);
	buildWatcher.on('change', (e) => {
		const fileName = <string>e.path;
		console.log(`file ${fileName.substr(fileName.indexOf('lavauth'))} was ${e.type}, running tasks...`);
	});
});

gulp.task('dev', ['build:watch']);