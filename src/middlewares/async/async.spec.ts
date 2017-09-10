import { asyncMiddleware } from './';

describe('Async middleware tests', () => {

	it('should call next', (done) => {
		const res: any = {};
		const req: any = {};
		const delay = ms => new Promise(res => setTimeout(() => res(), ms));

		asyncMiddleware(async (req, res, next) => {
			await delay(50);
			next();
		})(req, res, done);
	});

	it('should error catch in next() callback ', (done) => {
		const res: any = {};
		const req: any = {};
		const middleware = asyncMiddleware(async (req, res, next) => {
			throw new Error('test');
		});
		middleware(req, res, (err) => {
			expect(err).toBeDefined();
			expect(err.message).toEqual('test');
			done();
		});
	});

});
