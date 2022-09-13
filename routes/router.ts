// var controller = require('../controller')
const path = require('path');
import Controller from './../controller'

export default class Router {

    constructor(private app: any, private controller: Controller) {
    }

    public init() {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
        });
        this.app.get('/messages', this.controller.getMessages);

        this.app.post('/messages', (req, res) => {
            this.controller.saveMessage(req, res)
        });
    }
}