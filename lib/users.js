var users = [];


module.exports.getUsers = function(cb) {
    process.nextTick(function() {
        cb(null, users);
    });
};


module.exports.getUser = function(id, cb) {
    process.nextTick(function() {
        var i, user;

        for(i = 0; i < users.length; i++) {
            user = users[i];

            if(user.id === id) {
                return cb(null, user);
            }
        }

        cb();
    });
};


module.exports.addUser = function(user, cb) {
    process.nextTick(function() {
        var id = (users.length + 1).toString();

        if(!user) {
            return new Error('missing user name');
        }

        user.id = id;

        users.push(user);

        cb(null, user);
    });
};
