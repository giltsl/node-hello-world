var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var mongo = require('mongoose');
const { default: mongoose } = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var dbUrl = "mongodb+srv://user:user@tsltestcluster.nighjgc.mongodb.net/?retryWrites=true&w=majority";

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

// var messages = [
    // {"name": "Gil", "message": 'Hello Gil'},
    // {"name": "Tsl", "message": 'Hello Tsl'}
// ];
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    console.log("req body:");
    console.log(req.body);

    var message = new Message(req.body)
    message.save((err) => {
        if(err) {
            sendStatus(500);
            return;
        }
        // messages.push(req.body);
        io.emit("message", req.body);
        res.sendStatus(200);
    })

    
    
});

io.on('connection', (socket) => {
    console.log('A new user connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo db connection', err);
})
var server = http.listen(3000, () => {
    console.log("My app listen on port", server.address().port);
});

