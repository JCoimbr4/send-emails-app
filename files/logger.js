let winston = require('winston');

let logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.File({
            name: 'error-file',
            filename: './utils\\logs\\error-file.log',
            level: 'error',
            json: false
        }),
    ],
    exitOnError: true
});

module.exports = {
    logError: (errorString) => {
        logger.error(errorString);
    },

    readlineX:(lineNumber) => {
        let lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('./utils\\logs\\error-file.log')
        });

        lineReader.on('line', function(line){
            console.log('Line from file: ', line[lineNumber]);
        });
    }
}