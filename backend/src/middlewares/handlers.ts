import * as express from 'express'
import winston from 'winston'

import Config from '../config/Config'

const logger = winston.createLogger(Config.getInstace().settings.log)

// eslint-disable-next-line no-unused-vars
export const resultHandler = (
  result: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (result.status) {
    if (result.status === 500 || result.status === 503) {
      res.status(result.status).json({
        message: 'System not available',
      })
    } else {
      res.status(result.status).json({
        message: result.message || '',
      })
    }
  } else if (result.errors) {
    const message = result.message || result
    res.status(401).json({
      message,
    })
  } else {
    res.status(200).json(result)
  }
}

// eslint-disable-next-line no-unused-vars
export const errorHandlerNotFound = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(404).json({
    message: 'The resource {' + req.url + '} does not exist.',
  })
}

// eslint-disable-next-line no-unused-vars
export const requestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.info(req.url)
  next()
}
