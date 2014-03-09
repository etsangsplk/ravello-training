'use strict';

var _ = require('lodash');
var mongoose = require('mongoose-q')(require('mongoose'));

var ObjectId = mongoose.Types.ObjectId;

var User = mongoose.model('User');

exports.getUser = function(username) {
    return User.findOneQ({username: username});
};

exports.createUser = function(userData) {
    var user = new User(userData);
    return user.saveQ();
};

exports.updateUser = function(id, userData) {
    var data = _.cloneDeep(userData);
    data = _.omit(data, '_id');

    var options = {
        upsert: true
    };

    // We don't want to persist the password if it's empty, in order to keep the existing password...
    if (!data.password) {
        options.select = '-password';
    }

    // Also, for the upsert to work, in case there's a new entity (i.e. without and id)
    // we need to create an empty ObjectId, otherwise mongoose will fail.
    if (!id) {
        id = new ObjectId();
    }

    return User.findByIdAndUpdateQ(id, data, options);
};

exports.deleteUser = function(username) {
    return User.removeQ({'username': username});
};

exports.findAndDelete = function(id) {
    return User.findOneAndRemoveQ({'_id': id});
};