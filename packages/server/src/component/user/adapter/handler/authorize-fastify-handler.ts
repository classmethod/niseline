import { RouteHandlerMethod } from 'fastify'

export const buildAuthorizeFastifyHandler =
  (): RouteHandlerMethod => async (request, reply) => {
    const { redirectUri } = request.query as {
      redirectUri: string
    }

    reply.view('/template/authorize.ejs', { redirectUri })
  }
