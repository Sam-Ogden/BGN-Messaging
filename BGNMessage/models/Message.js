const util = require('util')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/BGN', (error)=>{
    if(error) console.log(error)
})

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId
 
var MessageSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    content: { type: String, required: true, minlength: 1 },
    timestamp: { type: Number, required: true },
    tags: { type: [String] },
})

var Message = mongoose.model('Message', MessageSchema)

module.exports = {
    getAllMessages: (cb)=>{
        Message.find({}, '_id content timestamp tags', (err, results)=>{
            cb(err, results)
        })
    },

    getMessageById: (id, cb)=>{
        Message.findOne({_id: id}, (err, result)=>{
            if(result == null && err == null) err = 'No message with given ID'  
            cb(err, result)
        })
    },

    create: (msg, cb)=>{
        Message.create(msg, (err, result)=>{
                cb(err, result)
        })
    },

    delete: (id, cb)=>{
        Message.findOne({_id: id}).remove((err)=>{
            cb(err)
        })
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
                if(!util.isString(msg.tags[i])) {
                    cb('Tags must be an array of strings, '+msg.tags[i]+' is not a string.')
                    return
                }
            }
        } else if(msg._id) {
            if(!mongoose.Types.ObjectId.isValid(msg._id)) cb('_id must be a valid object id')
        } 
        // SUCCESS  
        cb(null)
    },
}
