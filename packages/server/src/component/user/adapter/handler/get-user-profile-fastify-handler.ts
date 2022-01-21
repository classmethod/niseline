import {
  GetUserProfileResponseBody,
  LoginApiErrorResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildGetUserProfileFastifyHandler =
  (
    findUserUseCase: FindUserUseCase
  ): MyRouteHandlerMethod<{
    Reply: GetUserProfileResponseBody | LoginApiErrorResponseBody
  }> =>
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
      userId: showUserResult.id,
      displayName: 'Brown',
      pictureUrl: showUserResult.picture,
      statusMessage: 'Hello, NiseLine!',
    }
  }
