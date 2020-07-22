import Hapi from '@hapi/hapi'
import inert from '@hapi/inert'

import render from './render'

export const createServer = async () => {
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
