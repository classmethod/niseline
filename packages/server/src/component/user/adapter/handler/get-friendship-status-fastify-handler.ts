import {
  GetFriendshipStatusResponseBody,
  LoginApiErrorResponseBody,
} from '@niseline/line-api-types'
import { RequestGenericInterface } from 'fastify'
import { ReplyGenericInterface } from 'fastify/types/reply'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

interface RouteGeneric extends RequestGenericInterface, ReplyGenericInterface {
  Reply: GetFriendshipStatusResponseBody | LoginApiErrorResponseBody
}

export const buildFriendshipStatusFastifyHandler =
  (findUserUseCase: FindUserUseCase): MyRouteHandlerMethod<RouteGeneric> =>
  async (request, reply) => {
    const [, accessToken] = request.headers.authorization!.split(' ')

    const showUserResult = await findUserUseCase(accessToken)
    if (showUserResult instanceof UserNotFoundError) {
      reply.type('application/json').code(400)
      return {
        error: 'invalid_request',
        error_description: 'access token expired',
      }
    }

    reply.type('application/json').code(200)
    return {
      friendFlag: true,
    }
  }
