//  OpenShift sample Node application
var express = require('express'),
    fs = require('fs'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var server = require('http').Server(app);
var socketClient = require('socket.io-client')('http://localhost:9002');
var io = require('socket.io')(server);

app.use(morgan('combined'));
app.use(bodyParser.json());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 9004,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';

app.use(express.static('views'));

// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

socketClient.on('connect', function (socketClient) {
    console.log(socketClient);
});

socketClient.on('switchToggle', function (data) {
    socketChannel.emit('switchToggleOnUI', data);
});

io.on('connection', function (socket) {
    socketChannel = socket;
});

server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
