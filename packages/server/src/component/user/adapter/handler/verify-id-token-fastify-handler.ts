/* eslint-disable camelcase */

import {
  LoginApiErrorResponseBody,
  VerifyIdTokenRequestBody,
  VerifyIdTokenResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildVerifyIdTokenFastifyHandler =
  (
    findUserUseCase: FindUserUseCase
  ): MyRouteHandlerMethod<{
    Body: VerifyIdTokenRequestBody
    Reply: VerifyIdTokenResponseBody | LoginApiErrorResponseBody
  }> =>
  async (request, reply) => {
    const { id_token: idToken } = request.body

    const showUserResult = await findUserUseCase(idToken)

    if (showUserResult instanceof UserNotFoundError) {
      reply.type('application/json').code(400)
      return {
        error: 'invalid_request',
        error_description: 'Invalid IdToken.',
      }
    }

    reply.type('application/json').code(200)
    return {
      iss: 'https://example.com',
      sub: showUserResult.id,
      aud: '1234567890',
      exp: 1504169092,
      iat: 1504263657,
      nonce: '0987654asdf',
      amr: ['pwd'],
      name: showUserResult.name,
      picture: showUserResult.picture,
      email: showUserResult.email,
    }
  }
