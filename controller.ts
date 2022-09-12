var Message = require('./models/message')

exports.saveMessage = (req, res, io) => {
    var message = new Message.Message(req.body)
    message.save((err) => {
        if(err) {
            res.sendStatus(500);
            return;
        }

        io.emit("message", req.body);
        res.sendStatus(200);
    })
}

exports.getMessages = (req, res) => {
    Message.Message.find({}, (err, messages) => {
        res.send(messages);
    })
}