import 'core-js'
import 'regenerator-runtime/runtime'

import Hapi from '@hapi/hapi'
import inert from '@hapi/inert'

import render from './render'

const createServer = async () => {
  /**
   * BASIC SERVER
   */
  const server = Hapi.server({
    host: 'localhost',
    port: 8000,
  })
  await server.register(inert)

  /**
   * ROUTES
   */
  server.route({
    method: 'GET',
    path: '/static/{params*}',
    handler: {
      directory: {
        path: './dist/static',
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/{url*}',
    config: {
      handler: async (req, h) => {
        const html = await render(req)
        return h.response(html)
      },
    },
  })

  return server
}

async function startServer() {
  try {
    const server = await createServer()
    await server.start()
    console.log(
      `Server running at: ${server.info.uri}`,
      '\n- Open base: http://localhost:8000/base',
      '\n- Open client: http://localhost:8000/client1',
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()
