import * as DEV from './dev'

export default class Config {
  private static instance: Config
  private _settings: any

  private constructor() {
    switch (process.env.DOCKER_ENV) {
      default:
        this._settings = DEV
        return
    }
  }

  public static getInstace = (): Config => {
    if (!Config.instance) {
      Config.instance = new Config()
    }

    return Config.instance
  }

  public get settings() {
    return this._settings
  }
}
