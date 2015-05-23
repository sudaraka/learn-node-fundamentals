var express = require('express'),
    bodyParser = require('body-parser'),
    morgan  = require('morgan'),
    users  = require('./lib/users'),
    app = express();

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/users', function(request, response) {
    users.getUsers(function(err, result) {
        if(err) {
            return response.status(500).json({
                success: false,
                reason: err.message
            });
        }

        response.json({
            success: true,
            users: result
        });
    });

});


app.get('/users/:id', function(request, response) {
    var id = request.params.id;

    users.getUser(id, function(err, result) {
        if(err) {
            return response.status(500).json({
                success: false,
                reason: err.message
            });
        }

        if(!result) {
            return response.status(400).json({
                success: false,
                reason: 'user not found'
            });
        }

        response.json({
            success: true,
            users: result
        });
    });

});


app.post('/users', function(request, response) {
    var user = request.body;

    users.addUser(user, function(err, result) {
        if(err) {
            return response.status(500).json({
                success: false,
                reason: err.message
            });
        }

        response.json({
            success: true,
            users: result
        });

    });

});
