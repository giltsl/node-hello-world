
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import * as mongoose from 'mongoose';
import Router from './routes/router';
import Controller from './controller';

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

io.on('connection', (socket) => {
    console.log('A new user connected')
})

const controller = new Controller(io)
const router = new Router(app, controller);
router.init();

const dbUrl = "mongodb+srv://user:user@tsltestcluster.nighjgc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo db connection', err);
})

const server = http.listen(3000, () => {
    console.log("My app listen on port", server.address().port);
});
