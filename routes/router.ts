var controller = require('../controller')
const path = require('path');

exports.router = (app, io) => {    
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });
        app.get('/messages', controller.getMessages);

        app.post('/messages', (req, res) => {
            controller.saveMessage(req, res, io)
        });
    }