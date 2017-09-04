import * as express from 'express';

const app = express();

app.use('/', async (req, res) => {
	await delay(3000);
	res.end(' ok ');
});

const delay = ms => new Promise(res => setTimeout(res, ms));

app.listen(3000, () => console.log('server up...'));

