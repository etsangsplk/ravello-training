'use strict';

var q = require('q');
var _ = require('lodash');
var logger = require('../config/logger');

function initErrorsMiddleware(app) {
	app.use(function(error, request, response, next) {
		var errorStatus = 500;
		var errorMessage = error;
		var errorReason = error;

		if (error && _.isObject(error)) {
			if (error.message) {
				errorMessage = error.message;
			} else {
				errorMessage = error.toString();
			}

			if (error.reason) {
				errorReason = error.reason;
			}

			if (error.status) {
				errorStatus = error.status;
			}
		}

		logger.error(errorReason, errorMessage);

		response.send(errorStatus, errorMessage);
	});
}

function createError(status, message, reason) {
	return {
		status: status,
		message: message,
		reason: reason
	};
}

function handleSuperagentError(deferred) {
	return function(error, response) {
		var errorMessage = null;

		if (error) {
			errorMessage = error.message || error.toString();

		} else if (response.status) {
			if (response.status === 401) {
				errorMessage = 'You are not authorized to work against Ravello. Please check your Ravello Credentials.';
			} else if (response.status >= 400) {
				errorMessage =
					response.headers['error-message'] ||
					(response.body && response.body.operationMessages && response.body.operationMessages.length ?
						response.body.operationMessages[0].message : null) ||
					response.text ||
					response.error;
			}
		}

		if (errorMessage) {
			deferred.reject(createError(response.status, errorMessage, error));
		} else if (arguments.length > 2) {
			deferred.resolve(_.last(arguments, arguments.length - 1));
		} else {
			deferred.resolve(response);
		}
	};
}

function handleMongoError(errorStatus, errorMessage) {
	return function(error) {
		return q.reject(createError(errorStatus, errorMessage, error));
	}
}

module.exports.initErrorsMiddleware = initErrorsMiddleware;
module.exports.createError = createError;
module.exports.handleSuperagentError = handleSuperagentError;
module.exports.handleMongoError = handleMongoError;
