import { GetFriendshipStatusResponseBody } from '@niseline/line-api-types'
import { RouteHandlerMethod } from 'fastify'
import { ErrorResponseBody } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildFriendshipStatusFastifyHandler =
  (findUserUseCase: FindUserUseCase): RouteHandlerMethod =>
  async (request, reply) => {
    const [, accessToken] = request.headers.authorization!.split(' ')

    const showUserResult = await findUserUseCase(accessToken)
    if (showUserResult instanceof UserNotFoundError) {
      reply.type('application/json').code(400)
      return {
        error: 'invalid_request',
        error_description: 'access token expired',
      } as ErrorResponseBody
    }

    reply.type('application/json').code(200)
    return {
      friendFlag: true,
    } as GetFriendshipStatusResponseBody
  }
