'use strict';

var errorHandler = require('../utils/error-handler');

var q = require('q');
var _ = require('lodash');
var mongoose = require('mongoose-q')(require('mongoose'));

var ObjectId = mongoose.Types.ObjectId;

var User = mongoose.model('User');

exports.getUserById = function(id) {
    return User.findByIdQ(id).catch(errorHandler.handleMongoError(404, 'Could not read user ' + id));
};

exports.getUserByUsername = function(username) {
    return User.findOneQ({username: username}).catch(errorHandler.handleMongoError(404, 'Could not read user ' + username));
};

exports.getUserByRole = function(role) {
    return User.findQ({role: role}).catch(errorHandler.handleMongoError(404, 'Could not read user with role ' + role));
};

exports.createUser = function(userData) {
    var user = new User(userData);
    return user.saveQ().catch(errorHandler.handleMongoError(400, 'Could not create user'));
};

exports.updateUser = function(id, userData) {
    var data = _.cloneDeep(userData);
    data = _.omit(data, '_id');
    data = _.omit(data, '__v');

    var options = {
        upsert: true
    };

    // We don't want to persist the password if it's empty, in order to keep the existing password...
    if (!data.password) {
        options.select = '-password';

        // Make sure the password is omitted, if its undefined, as mongoose will fail in the update if the
        // property exists but is undefined.
        data = _.omit(data, 'password');
    }

    // Also, for the upsert to work, in case there's a new entity (i.e. without and id)
    // we need to create an empty ObjectId, otherwise mongoose will fail.
    if (!id) {
        id = new ObjectId();
    }

    return User.findByIdAndUpdateQ(id, data, options).catch(
        function(error) {
            var errorMessage = 'Could not update user';
            if (error.message && error.message.indexOf("duplicate key") !== -1) {
                errorMessage += ': username already exists';
            }
            return q.reject(errorHandler.createError(400, errorMessage, error));
        }
    );
};

exports.deleteUser = function(id) {
    return User.removeQ({'_id': new ObjectId(id)}).catch(errorHandler.handleMongoError(404, 'Could not delete user ' + id));
};

exports.findAndDelete = function(id) {
    return User.findOneAndRemoveQ({'_id': new ObjectId(id)}).catch(errorHandler.handleMongoError(404, 'Could not delete user ' + id));
};