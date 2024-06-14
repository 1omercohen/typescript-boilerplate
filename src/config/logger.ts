import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        // new transports.File({ filename: `${appRoot}/logs/<FILE_NAME>.log` }),
    ],
})

module.exports = logger
