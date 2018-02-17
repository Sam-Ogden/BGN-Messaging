var express = require('express');
var router = express.Router();
var Message = require('../models/Message')
/**
 * @api {get} /api/messages/ Get all messages
 * @apiGroup Messages
 * @apiSuccess {Boolean}    result Whether request was successful or not
 * @apiSuccess {String}     dataType Type of data returned
 * @apiSuccess {Message[]}  data Array of messages
 */
router.get('/', function(req, res, next) {
	Message.getAllMessages((err, results)=>{
		if(err) {
			res.statusCode = 500
			res.json({
				result: false,
				dataType: 'string',
				data: 'Error: there was a problem with your request. '+err
			})		
		} else {
			res.json({
				result: true,
				dataType: 'message',
				data: results
			})
		}
	})    
});

/**
 * @api {post} /api/messages/ Create message
 * @apiDescription Creates a message from a JSON object
 * @apiGroup Messages
 * @apiSuccess {Boolean}    result Whether request was successful or not
 * @apiSuccess {String}     dataType Type of data returned
 * @apiSuccess {Message}    data The created message object
 * @apiParam (Required parameters) {String} content The messages content
 * @apiParam (Required parameters) {Number} timestamp 
 * 			Date created (UNIX epoch format, number of seconds sice 01/01/1970 00:00:00)
 * @apiParam (Optional parameters) {Number} _id The messages unique id
 * @apiParam (Optional parameters) {String[]} tags  Message tags
 * @apiExample {curl} Example usage:
 *     curl -X POST  http://host/api/messages -H 'content-type: application/json' \
 *           -d '{
 *              "_id": "59f22f4d7dac520013887673",
 *              "content": "This is an example message",
 *              "timestamp": 1509104270,
 *              "tags": ["important", "private", "draft"]
 *           }'
 */
router.post('/', function(req, res, next) {
	Message.validateMessage(req.body, (err)=>{
		if(err) {
			res.statusCode = 400
			res.json({
				result: false,
				dataType: 'string',
				data: "Validation error: "+err
			})
		} else {
			// Valid message, create document
			Message.create(req.body, (err, result)=>{
				if(err) {
					res.statusCode = 400
					res.json({
						result: false,
						dataType: 'string',
						data: 'Error: there was a problem with your request. '+err
					})
				} else {
					res.json({
						result: true,
						dataType: 'message',
						data: result
					})
				}
			})
		}
	})
});

/**
 * @api {get} /api/messages/<_id> Get message
 * @apiDescription Get message with given _id. If no message exists with id, returns 400
 * @apiGroup Messages
 * @apiSuccess {Boolean}    result Whether request was successful or not
 * @apiSuccess {String}     dataType Type of data returned
 * @apiSuccess {Message}    data The message object with given _id
 * @apiExample {curl} Example usage:
 *      curl -X GET http://host/api/messages/59f22f4d7dac520013887673 -H 'content-type: application/json'
 */
router.get('/:_id', function(req, res, next) {
    Message.getMessageById(req.params._id, (err, result)=>{
		if(err) {
			res.statusCode = 400
			res.json({
				result: false,
				dataType: 'string',
				data: err
			})
		} else {
			res.json({
				result: true,
				dataType: 'message',
				data: result
			})
		}
	})
});

/**
 * @api {delete} /api/messages/<_id> Delete message
 * @apiDescription Delete message with given _id
 * @apiGroup Messages
 * @apiSuccess {Boolean}    result Whether request was successful or not
 * @apiSuccess {String}     dataType Type of data returned
 * @apiSuccess {String}     data "Message deleted"
 * @apiExample {curl} Example usage:
 *      curl -X DELETE http://host/api/messages/59f22f4d7dac520013887673 -H 'content-type: application/json'
 */
router.delete('/:_id', function(req, res, next) {
    Message.delete(req.params._id, (err)=>{
		if(err) {
			res.statusCode = 400
			res.json({
				result: false,
				dataType: 'string',
				data: err
			})
		} else {
			res.json({
				result: true,
				dataType: 'string',
				data: 'Message deleted'
			})
		}
	})
});


module.exports = router;
