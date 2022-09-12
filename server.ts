var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var mongo = require('mongoose');
import * as mongoose from 'mongoose';
var router = require('./routes/router');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

io.on('connection', (socket) => {
    console.log('A new user connected')
})

router.router(app, io);

var dbUrl = "mongodb+srv://user:user@tsltestcluster.nighjgc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo db connection', err);
})

var server = http.listen(3000, () => {
    console.log("My app listen on port", server.address().port);
});