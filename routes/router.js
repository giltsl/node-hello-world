var controller = require('../controller')

exports.router = (app, io) => {
    app.get('/messages', controller.getMessages);
    
    app.post('/messages', (req, res) => {
        controller.saveMessage(req, res, io)
    });
}