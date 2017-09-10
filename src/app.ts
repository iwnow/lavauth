import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { v1 } from './routes';
import { notFoundHandler, errorHandler } from './handlers';

const app = express();

// external middlewares
app.use([
	helmet() as any, // secure middleware
	bodyParser.json()
]);

// api controllers
app.use('/api', v1);

app.use([
	notFoundHandler,
	errorHandler
]);

export default app;
