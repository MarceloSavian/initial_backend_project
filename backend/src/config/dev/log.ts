import winston from 'winston'

export default {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
}
