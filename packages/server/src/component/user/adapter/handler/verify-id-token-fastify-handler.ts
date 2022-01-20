/* eslint-disable camelcase */

import { RouteHandlerMethod } from 'fastify'
import { ErrorResponseBody } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

/**
 * https://developers.line.biz/ja/reference/line-login/#verify-id-token
 */
interface VerifyIdTokenRequestBody {
  id_token: string
  client_id: string
}

interface VerifyIdTokenResponseBody {
  iss: string // 'https://access.line.me'
  sub: string // 'U1234567890abcdef1234567890abcdef'
  aud: string // '1234567890'
  exp: number // 1504169092
  iat: number // 1504263657
  nonce: string // '0987654asdf'
  amr: ReadonlyArray<string> // ['pwd']
  name: string // 'Taro Line'
  picture: string // 'https://sample_line.me/aBcdefg123456'
  email: string // 'taro.line@example.com'
}

export const buildVerifyIdTokenFastifyHandler =
  (findUserUseCase: FindUserUseCase): RouteHandlerMethod =>
  async (request, reply) => {
    const idToken = (request.body as VerifyIdTokenRequestBody).id_token

    const showUserResult = await findUserUseCase(idToken)

    if (showUserResult instanceof UserNotFoundError) {
      reply.type('application/json').code(400)
      return {
        error: 'invalid_request',
        error_description: 'Invalid IdToken.',
      } as ErrorResponseBody
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
    } as VerifyIdTokenResponseBody
  }
