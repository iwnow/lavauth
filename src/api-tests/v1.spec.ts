import server from '../server';
import * as request from 'supertest';

const app = server.app;

describe('API v1 tests', () => {

	it('req to /api/v1/user get user test', (done) => {
		request(app)
			.get('/api/v1/user')
			.end((err, res) => {
				expect(res.body.user).toBeDefined('version property not defined in the result body when /api calls');
				done();
			});
	});

});

