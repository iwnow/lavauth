import server from '../server';
import * as request from 'supertest';

const app = server.app;

describe('API 1st test', () => {

	it('req to /api get version', (done) => {
		request(app)
			.get('/api')
			.end((err, res) => {
				expect(res.body.version).toBeDefined('version property not defined in the result body when /api calls');
				done();
			});
	});

});

