import * as express from 'express';
import { asyncMiddleware } from './middlewares';
import { v1 } from './routes';
import { notFoundHandler, errorHandler } from './handlers';

const app = express();

app.use('/api', v1);

app.use([
	notFoundHandler,
	errorHandler
]);

export default app;
