const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const Message = require('../../models/Message');
const mongoose = require('mongoose')
const expect = chai.expect;

dbURI = 'mongodb://localhost:27017/BGNTest'
testMsg = null 

chai.use(chaiHttp);

describe('Messaging API', ()=>{
	beforeEach((done)=>{
        mongoose.connect(dbURI);
        fillDb(done)        
	})

	describe('GET all messages', ()=>{
		it('responds with status 200, result true and data length of 1', function(done) {
			chai.request(app)
			.get('/api/messages/')
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body.result).to.equal(true);
				expect(res.body.data).to.have.lengthOf(1)
				done();
			});
		});
	});

	describe('POST create messages', ()=>{
		it('responds with status 200, result true, contains data', function(done) {
			chai.request(app)
			.post('/api/messages/')
			.send({content: 'what should i put here', timestamp: 123, tags: ['uno', 'dos']})
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body.result).to.equal(true);
				expect(res.body.dataType).to.equal('message');				
				expect(res.body.data.timestamp).to.equal(123)
				done();
			});
		});

		it('invalid id: responds with status 400, result false, validation error', function(done) {
			chai.request(app)
			.post('/api/messages/')
			.send({_id: 1, content: 'invalid id', timestamp: 123, tags: ['uno', 'dos']})
			.end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res.body.result).to.equal(false);
				expect(res.body.dataType).to.equal('string');				
				done();
			});
		});

		it('invalid tags: responds with status 400, result false, validation error', function(done) {
			chai.request(app)
			.post('/api/messages/')
			.send({_id: 1, content: 'invalid tag false', timestamp: 123, tags: [123, 'dos']})
			.end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res.body.result).to.equal(false);
				expect(res.body.dataType).to.equal('string');				
				done();
			});
		});
	});

	describe('GET message with ID', ()=>{
		it('responds with status 200, result true and data length of 1', function(done) {
			chai.request(app)
			.get('/api/messages/'+testMsg._id)
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body.result).to.equal(true);
				expect(String(res.body.data._id)).to.equal(String(testMsg._id))
				done();
			});
		});

		it('No message with ID responds with status 400, result false', function(done) {
			chai.request(app)
			.get('/api/messages/5a7817d9e69938e6693e7a88')
			.end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res.body.result).to.equal(false);
				done();
			});
		});

		it('Invalid ID responds with status 400, result false', function(done) {
			chai.request(app)
			.get('/api/messages/necesitoMasDineroPlsHelp')
			.end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res.body.result).to.equal(false);
				done();
			});
		});
	});

	describe('DELETE message with ID', ()=>{
		it('responds with status 200, result true', function(done) {
			chai.request(app)
			.delete('/api/messages/'+testMsg._id)
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body.result).to.equal(true);
				done();
			});
		});

		it('No message with ID responds with status 200, result true', function(done) {
			chai.request(app)
			.delete('/api/messages/5a7817d9e69938e6693e7a88')
			.end(function(err, res) {
				expect(res).to.have.status(200);
				expect(res.body.result).to.equal(true);
				done();
			});
		});

		it('Invalid ID responds with status 400, result false', function(done) {
			chai.request(app)
			.delete('/api/messages/necesitoMasDineroPlsHelp')
			.end(function(err, res) {
				expect(res).to.have.status(400);
				expect(res.body.result).to.equal(false);
				done();
			});
		});
	});
});

// Clear Message collection, and fill with fresh test data
function fillDb(done) {
    mongoose.model('Message').find().remove((e)=>{
        if(e) console.log(e)
        mongoose.model('Message').create({
                content: 'Hola amigo!', 
                timestamp: 12321, 
                tags: ['hi', 'bye']
            }, (err, res)=>{
                testMsg = res
                done()                    
        })
    })
}