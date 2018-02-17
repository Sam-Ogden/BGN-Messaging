const chai = require('chai');
const Message = require('../../models/Message');
const mongoose = require('mongoose')
const expect = chai.expect;

dbURI = 'mongodb://localhost:27017/BGNTest'
testMsg = null 
describe('Message Model', ()=>{
    beforeEach((done)=>{
        mongoose.connect(dbURI);
        fillDb(done)        
	})

    describe('getAllMessages', ()=>{
        // Getting messages should always work.
        it('Error is null', (done)=>{
            Message.getAllMessages((err, res)=>{
                expect(err).to.equal(null)
                done()                
            })
        })
        // Return all messages (only 1 test message created)
        it('Result has length 1', (done)=>{
            Message.getAllMessages((err, res)=>{
                expect(res).to.have.lengthOf(1)
                done()                
            })
        })
    })

    describe('getMessageById', ()=>{
        // ID doesnt exist
        it('ID doesnt exist no message returned', (done)=>{
            Message.getMessageById('123ab11223456234376543de', (err, res)=>{
                expect(res).to.equal(null)
                done()                
            })
        })
        // ID exists returns single Message
        it('ID exists message returned', (done)=>{
            Message.getMessageById(testMsg._id, (err, res)=>{
                expect(err).to.equal(null)
                expect(String(res._id)).to.equal(String(testMsg._id))                
                done()                
            })
        })
    })

    describe('validateMessage', ()=>{
        // Valid messages
        it('no errors without tags', (done)=>{
            Message.validateMessage({content: 'a', timestamp: 123}, (err)=>{
                expect(err).to.equal(null)
                done()
            })
        })
        it('no errors with valid tags', (done)=>{
            Message.validateMessage({content: 'a', timestamp: 123, tags: ['dont', 'fail']}, (err)=>{
                expect(err).to.equal(null)
                done()                    
            })
        })

        // TODO: *** isolate each field creating invalid messages
    })
    
    describe('create Message', ()=>{
        // Valid messages
        it('should not return any errors', (done)=>{
            Message.create({content: 'a', timestamp: 123}, (err)=>{
                expect(err).to.equal(null)
                done()
            })
        })
        it('no errors with valid tags', (done)=>{
            Message.validateMessage({content: 'a', timestamp: 123, tags: ['dont', 'fail']}, (err)=>{
                expect(err).to.equal(null)
                done()                    
            })
        })
        it('No content returns error', (done)=>{
            Message.create({content: '', timestamp: 123}, (err, result)=>{
                expect(err).to.not.equal(null)
                done()
            })
        })      
        it('invalid timestamp returns error', (done)=>{
            Message.create({content: 'a', timestamp: 'zz', tags: ['do', 'fail']}, (err, result)=>{
                expect(err).to.not.equal(null)
                done()
            })
        })      
        // isolate each field creating invalid messages
    })
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