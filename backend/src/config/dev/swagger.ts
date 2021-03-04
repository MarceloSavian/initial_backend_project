import swaggerJSDoc from 'swagger-jsdoc'

import env from './env'

const swaggerDefinition = {
  info: {
    title: 'Access management API', // Title of the documentation
    version: env.versionNumber, // Version of the app
    description: 'Access management of users', // short description of the app
  },
  host: `localhost:${env.server.port}`, // the host or url of the app
  basePath: `/api/${env.version}`, // the basepath of your endpoint
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  explorer: true,
  // path to the API docs
  apis: ['**/*Router.ts'],
}

const url = '/api-docs'
const swagger = swaggerJSDoc(options)
// initialize swagger-jsdoc
export default { swagger, url }
