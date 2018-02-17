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