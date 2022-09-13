var Message = require('./models/message')

export default class Controller {

    constructor(private io) {
    }
    
    saveMessage = (req, res) => {
        var message = new Message.Message(req.body)
        message.save((err) => {
            if(err) {
                res.sendStatus(500);
                return;
            }
    
            this.io.emit("message", req.body);
            res.sendStatus(200);
        })
    }

    getMessages = (req, res) => {
        Message.Message.find({}, (err, messages) => {
            res.send(messages);
        })
    }
}