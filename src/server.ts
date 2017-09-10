import * as express from 'express';
import { asyncMiddleware } from './middlewares';

const app = express();

app.get('/api', (req, res) => {
	res.send({
		version: '1.0.0'
	});
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
