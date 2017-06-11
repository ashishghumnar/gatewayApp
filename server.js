//  OpenShift sample Node application
var express = require('express'),
    fs = require('fs'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

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

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
