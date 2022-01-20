import { RouteHandlerMethod } from 'fastify'

export const buildDebugPingFastifyHandler =
  (): RouteHandlerMethod => async (_, reply) => {
    reply.type('application/json').code(200)
    return { ping: 'pong' }
  }
