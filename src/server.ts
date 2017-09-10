import * as express from 'express';
import { asyncMiddleware } from './middlewares';
import { v1 } from './routes';

const app = express();

app.use('/api', v1);

app.use((req, res, next) => {
	res.status(404);
	res.end();
});

app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err);
	res.status(500);
	res.end();
});

const port = 3333;

const server = {
	app,

	start() {
		app.listen(port, () => console.log(`server listen to http://localhost:${port}`));
	}

};

export default server;
