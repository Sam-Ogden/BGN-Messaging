define({ "api": [
  {
    "type": "delete",
    "url": "/api/messages/<_id>",
    "title": "Delete message",
    "description": "<p>Delete message with given _id</p>",
    "group": "Messages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Whether request was successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataType",
            "description": "<p>Type of data returned</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>&quot;Message deleted&quot;</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE http://host/api/messages/59f22f4d7dac520013887673 -H 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Messages",
    "name": "DeleteApiMessages_id"
  },
  {
    "type": "get",
    "url": "/api/messages/",
    "title": "Get all messages",
    "group": "Messages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Whether request was successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataType",
            "description": "<p>Type of data returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Message[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of messages</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Messages",
    "name": "GetApiMessages"
  },
  {
    "type": "get",
    "url": "/api/messages/<_id>",
    "title": "Get message",
    "description": "<p>Get message with given _id</p>",
    "group": "Messages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Whether request was successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataType",
            "description": "<p>Type of data returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Message",
            "optional": false,
            "field": "data",
            "description": "<p>The message object with given _id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET http://host/api/messages/59f22f4d7dac520013887673 -H 'content-type: application/json'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Messages",
    "name": "GetApiMessages_id"
  },
  {
    "type": "post",
    "url": "/api/messages/",
    "title": "Create message",
    "description": "<p>Creates a message from a JSON object</p>",
    "group": "Messages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "description": "<p>Whether request was successful or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataType",
            "description": "<p>Type of data returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Message",
            "optional": false,
            "field": "data",
            "description": "<p>The created message object</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Required parameters": [
          {
            "group": "Required parameters",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The messages content</p>"
          },
          {
            "group": "Required parameters",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Date created (UNIX epoch format)</p>"
          }
        ],
        "Optional parameters": [
          {
            "group": "Optional parameters",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>The messages unique id</p>"
          },
          {
            "group": "Optional parameters",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Message tags</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST  http://host/api/messages -H 'content-type: application/json' \\\n      -d '{\n         \"_id\": \"59f22f4d7dac520013887673\",\n         \"content\": \"This is an example message\",\n         \"timestamp\": 1509104270,\n         \"tags\": [\"important\", \"private\", \"draft\"]\n      }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Messages",
    "name": "PostApiMessages"
  }
] });