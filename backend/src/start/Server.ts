import express = require('express')
import Config from '@config/Config'
import * as handlers from '@middlewares/handlers'
import * as bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express'
import winston from 'winston'

const app: express.Application = express()

const logger = winston.createLogger(Config.getInstace().settings.log)

export default class Server {
  private envConfig: any
  private port: any
  private version: any
  private swaggerConfig: any

  constructor(config: Config) {
    this.envConfig = config.settings.env
    this.port = this.envConfig.server.port
    this.version = this.envConfig.version
    this.swaggerConfig = config.settings.swagger
  }

  /**
   *
   * Init of all middlewares and routers
   *
   */
  public init(): any {
    this.initDatabase()
    this.addMiddlewares()
    this.initRouters()
    this.listen()
  }

  /**
   *
   * Init of database
   *
   */
  private async initDatabase() {}

  /**
   *
   * Middlewares
   *
   */
  private addMiddlewares() {
    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression())
    app.use(
      this.swaggerConfig.url,
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerConfig.swagger)
    )
    app.use(handlers.errorHandlerNotFound)
    app.use(handlers.resultHandler)
    app.use(handlers.requestHandler)
  }

  /**
   *
   * Init of routers
   *
   */
  private initRouters() {}

  /**
   *
   * Listen off app
   *
   */
  private listen() {
    app.listen(this.port, () => {
      logger.info(`App is listening on port ${this.port}`)
      logger.info(`${this.version}`)
    })
  }

  /**
   *
   * Return of app
   *
   */
  public app() {
    return app
  }
}
