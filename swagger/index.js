const { join, dirname } = require('path')
const { fileURLToPath } = require('url')
const { swaggerAutogen } =require('swagger-autogen')

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
  info: {
    title: 'News API',
    description: 'My news API',
  },
  definitions: {
    New: {
      id: '1',
      title: 'text',
      content: 'text',
      tags: 'text',
      image: 'text',
      userId: 1,
      user: {
        username: 'text',
        id: 1,
        email: 'text',
        avatar: 'text'
      }
    },
    News: [
      {$ref: '#/definitions/New'}
    ] 
  },
  host: 'localhost:3000',
  schemes: ['http'],
}
const outputFile = join(_dirname, 'output.json')
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../app.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`)
 })