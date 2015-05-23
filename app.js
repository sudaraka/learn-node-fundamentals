var express = require('express'),
    app = express();

app.get('/', function(request, response) {
    response.send('Hello');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
