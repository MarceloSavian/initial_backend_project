import Config from './config/Config'
import Server from './start/Server'

const server = new Server(Config.getInstace())

server.init()

export default server.app()
