'use strict';

const fs = require('fs');
const { createLogger, format, transports } = require('winston');

let _transports = [];
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

const consoleLogger = new transports.Console({
	level: 'debug',
	format: format.combine(
		format.colorize(),
		format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`)
	)
});

if (env == 'production')
	_transports.push(consoleLogger)

else {
	require('winston-daily-rotate-file');

	if (!fs.existsSync(logDir))
		fs.mkdirSync(logDir);

	const dailyRotateFileTransport = new transports.DailyRotateFile({
		filename: `${logDir}/%DATE%.log`,
		datePattern: 'YYYY-MM-DD'
	});

	_transports.push(dailyRotateFileTransport);
	_transports.push(consoleLogger);
}

const logger = createLogger({
	level: env === 'development' ? 'verbose' : 'info',
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`)
	),
	transports: _transports
});

module.exports = logger;