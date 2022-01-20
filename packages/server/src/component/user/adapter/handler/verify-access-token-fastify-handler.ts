/* eslint-disable camelcase */

import {
  VerifyAccessTokenRequestQuery,
  VerifyAccessTokenResponseBody,
} from '@niseline/line-api-types'
import { RouteHandlerMethod } from 'fastify'
import { ErrorResponseBody } from '../../../../util/handler'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildVerifyAccessTokenFastifyHandler =
  (findUserUseCase: FindUserUseCase): RouteHandlerMethod =>
  async (request, reply) => {
    const accessToken = (request.query as VerifyAccessTokenRequestQuery)
      .access_token

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
      scope: 'profile',
      client_id: '1440057261',
      expires_in: 2591659,
    } as VerifyAccessTokenResponseBody
  }
