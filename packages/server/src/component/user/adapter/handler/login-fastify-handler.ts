import { RouteHandlerMethod } from 'fastify'
import { LoginUseCase, UserNotFoundError } from '../../use-case/login-use-case'

export const buildLoginFastifyHandler =
  ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clientEndpoint,
    loginUseCase,
  }: {
    clientEndpoint: string
    loginUseCase: LoginUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const body = request.body as {
      userId: string
      redirectUri: string
    }
    const user = await loginUseCase(body.userId)
    if (user instanceof UserNotFoundError) {
      reply.redirect(
        302,
        `/niseline/authorize?${new URLSearchParams({
          redirectUri: body.redirectUri,
        }).toString()}`
      )
      return
    }

    const url = new URL(body.redirectUri)
    url.search = new URLSearchParams({
      userId: user.id,
    }).toString()
    reply.redirect(302, url.toString())
  }
