import * as express from 'express';
import { asyncMiddleware } from './middlewares';

const app = express();

app.use(asyncMiddleware(async (req, res, next) => {
	await test();
}));

app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err);
	res.status(500);
	res.end();
});

const delay = ms => new Promise(res => setTimeout(res, ms));
const test = async () => {
	await delay(300);
	throw new Error('test async error');
};

const port = 3333;
app.listen(port, () => console.log(`server listen to http://localhost:${port}`));

