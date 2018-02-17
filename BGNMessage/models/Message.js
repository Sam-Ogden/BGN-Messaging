const util = require('util')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/BGN', (error)=>{
    if(error) console.log(error)
})

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId
 
var MessageSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true },
    tags: { type: [String] },
})

var Message = mongoose.model('Message', MessageSchema)
// Message.create({content: 'Hey there', timestamp: 123123123, tags: ['hi']}, (err, result)=>{

// })
module.exports = {
    getAllMessages: (cb)=>{
        Message.find({}, '_id content timestamp tags', (err, results)=>{
            cb(err, results)
        })
    },

    getMessageById: (id, cb)=>{
        _id = new mongoose.mongo.ObjectID(id)
        Message.findOne({_id: _id}, (err, results)=>{
            cb(err, results)
        })
    },

    create: (msg, cb)=>{
        return
    },

    validateMessage: (msg, cb)=>{
        if(!msg.content) cb('Content can not be empty.')
        else if(!util.isString(msg.content)) 
            cb('Content must be a string.')
        else if(!msg.timestamp) 
            cb('Timestamp can not be empty.')
        else if(!util.isNumber(msg.timestamp)) 
            cb('Timestamp must be a number, '+msg.timestamp+' is NaN')
        else if(msg.timestamp > Date.now() || msg.timestamp < 0) 
            cb('Timestamp can not be in the future and must be positive')
        else if(msg.tags) {
            if(!util.isArray(msg.tags)) cb('Tags must be an array of strings')
            for(i in msg.tags) {
                if(!util.isString(msg.tags[i])) 
                    cb('Tags must be an array of strings, '+msg.tags[i]+' is not a string.')
            }
        } else cb(null)
    },
}
