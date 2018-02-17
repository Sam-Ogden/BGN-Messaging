const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Messaging API', ()=>{
	it('responds with status 200', function(done) {
		chai.request(app)
		.get('/api/messages/')
		.end(function(err, res) {
			expect(res).to.have.status(200);
			done();
		});
	});
});
