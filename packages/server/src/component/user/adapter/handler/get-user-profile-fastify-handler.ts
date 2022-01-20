import { RouteHandlerMethod } from 'fastify'
import { ErrorResponseBody } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

/**
 * https://developers.line.biz/ja/reference/line-login/#get-user-profile
 */
interface GetUserProfileResponseBody {
  userId: string // 'U4af4980629...'
  displayName: string // 'Brown'
  pictureUrl: string // 'https://profile.line-scdn.net/abcdefghijklmn'
  statusMessage: string // 'Hello, LINE!'
}

export const buildGetUserProfileFastifyHandler =
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
      userId: showUserResult.id,
      displayName: 'Brown',
      pictureUrl: showUserResult.picture,
      statusMessage: 'Hello, NiseLine!',
    } as GetUserProfileResponseBody
  }
