import * as express from 'express';

const router =  express.Router();

router.get('/user', (req, res) => {
	res.json({
		user: 'test'
	});
});

router.get('/user/:id', (req, res) => {
	throw new Error('not implemented');
});

const v1 = express.Router();
v1.use('/v1', router);

export default v1;
