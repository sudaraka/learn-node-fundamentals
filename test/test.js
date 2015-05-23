var assert = require('assert'),
    app = require('../app'),
    request = require('supertest');


describe('basic test', function() {
    var last_user;

    it('should get a collection of users', function(done) {
        request(app)
            .get('/users')
            .expect(200)
            .end(function(err, result) {
                if(err) {
                    return done(err);
                }

                assert.equal(result.body.success, true);

                done();
            });
    });

    it('should add a user', function(done) {
        request(app)
            .post('/users')
            .send({name: 'test user'})
            .expect(200)
            .end(function(err, result) {
                if(err) {
                    return done(err);
                }

                assert.equal(result.body.success, true);
                assert.equal(result.body.user.name, 'test user');
                assert(0 < result.body.user.id);

                last_user = result.body.user;

                done();
            });
    });

    it('should get a user', function(done) {
        request(app)
            .get('/users/' + last_user.id)
            .expect(200)
            .end(function(err, result) {
                if(err) {
                    return done(err);
                }

                assert.equal(result.body.success, true);
                assert.equal(result.body.user.name, last_user.name);
                assert.equal(result.body.user.id,  last_user.id);

                done();
            });
    });

});
