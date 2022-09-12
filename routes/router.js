var controller = require('../controller')

exports.router = (app) => {
    app.get('/messages', controller.getMessages);
    app.post('/messages', controller.saveMessage);
}