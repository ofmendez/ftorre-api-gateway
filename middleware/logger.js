'use strict';

const logger = require('../utils/logger');

module.exports = (req, res, next) => {
	logger.info({
		ip: req.ip,
		url: req.originalUrl,
		method: req.method,
		body: req.body,
		params: req.params,
		query: req.query
	});

	next();
}