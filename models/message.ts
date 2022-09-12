

var mongo = require('mongoose');
const { default: mongoose } = require('mongoose');

exports.Message = mongoose.model('Message', {
    name: String,
    message: String
});

