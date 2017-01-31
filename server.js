/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
// }

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname,'/public/index.html'));
// });

app.get('*', function (req, res) {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end('Page not found!');
});

// обработка ошибок
app.use(function(err, req, res, next) {
    if (err) console.log(err.stack);

    res.status(500).send('oops...something went wrong');
});

app.listen(app.get('port'), function() {

    console.log('App listening on port ' + app.get('port'));

});

