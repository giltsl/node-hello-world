var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

var Message = require('./models/message')

exports.saveMessage = (req, res) => {
    var message = new Message.Message(req.body)
    message.save((err) => {
        if(err) {
            res.sendStatus(500);
            return;
        }
        // messages.push(req.body);
        io.emit("message", req.body);
        res.sendStatus(200);
    })
}

exports.getMessages = (req, res) => {
    Message.Message.find({}, (err, messages) => {
        res.send(messages);
    })
}