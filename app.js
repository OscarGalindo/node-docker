var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bunyan = require('bunyan');
var config = require('config');

var log = bunyan.createLogger({name: "app"});

console.log(config);
// DB
var mongoUri = 'mongodb://' + config.get('dbConfig.user') + ':' + config.get('dbConfig.pass') + '@' + config.get('dbConfig.host') + '/' + config.get('dbConfig.name');
console.log(mongoUri);
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', function(err) {
    log.error('error connecting to mongo', err);
});
db.once('open', function() {
    log.info('connected to database');
});

// static content
app.use(express.static('dist'));
app.use(express.static('app/components'));

app.listen(config.appPort, function () {
    log.info('server listening on port ' + config.appPort);
});
