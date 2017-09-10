import app from '../../app';
import * as request from 'supertest';
import * as path from'path';
const prefix = '/api/v1/';

describe('API /api/v1/ tests', () => {

	it('req to /users get user test', (done) => {
		const url = path.join(prefix, 'user');
		request(app)
			.get(url)
			.end((err, res) => {
				expect(res.body.user).toBeDefined('user property not defined in the result body');
				expect(res.body.user).toEqual('test');
				done();
			});
	});

});

