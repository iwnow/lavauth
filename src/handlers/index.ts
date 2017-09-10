import notFoundHandler from './notFoundHandler';
import errorHandler from './errorHandler';

const allHandlers = [
	notFoundHandler,
	errorHandler
];

export {
	notFoundHandler,
	errorHandler,
	allHandlers
};

