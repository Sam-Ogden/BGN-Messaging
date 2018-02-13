var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Messaging API', function() {
	it('responds with status 200', function(done) {
		chai.request(app)
		.get('/api/messages/')
		.end(function(err, res) {
			expect(res).to.have.status(200);
			done();
		});
	});
});
