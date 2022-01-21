/* eslint-disable camelcase */

import {
  LoginApiErrorResponseBody,
  VerifyAccessTokenRequestQuery,
  VerifyAccessTokenResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildVerifyAccessTokenFastifyHandler =
  (
    findUserUseCase: FindUserUseCase
  ): MyRouteHandlerMethod<{
    Querystring: VerifyAccessTokenRequestQuery
    Reply: VerifyAccessTokenResponseBody | LoginApiErrorResponseBody
  }> =>
  async (request, reply) => {
    const { access_token: accessToken } = request.query

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
      scope: 'profile',
      client_id: '1440057261',
      expires_in: 2591659,
    }
  }
