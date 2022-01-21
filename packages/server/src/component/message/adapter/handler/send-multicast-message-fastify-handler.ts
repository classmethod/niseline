/* eslint-disable camelcase */

import {
  SendMulticastMessageRequestBody,
  SendMulticastMessageResponseBody,
  MessagingApiErrorResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  ChannelAccessTokenInvalidError,
  SendMulticastMessageUseCase,
  UserIdInvalidError,
} from '../../use-case/send-multicast-message-use-case'

export const buildSendMulticastMessageFastifyHandler =
  ({
    sendMulticastMessageUseCase,
  }: {
    sendMulticastMessageUseCase: SendMulticastMessageUseCase
  }): MyRouteHandlerMethod<{
    Body: SendMulticastMessageRequestBody
    Reply: SendMulticastMessageResponseBody | MessagingApiErrorResponseBody
  }> =>
  async (request, reply) => {
    const [, channelAccessToken] = request.headers.authorization!.split(' ')
    const requestBody = request.body

    const sendMulticastMessageUseCaseResult = await sendMulticastMessageUseCase(
      {
        channelAccessToken,
        userIds: requestBody.to,
      }
    )

    if (
      sendMulticastMessageUseCaseResult instanceof
      ChannelAccessTokenInvalidError
    ) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid channel access token',
      }
    }

    if (sendMulticastMessageUseCaseResult instanceof UserIdInvalidError) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid user IDs',
      }
    }

    reply.type('application/json').code(200)
    return {}
  }
