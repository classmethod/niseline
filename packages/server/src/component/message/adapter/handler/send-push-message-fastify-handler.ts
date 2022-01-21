import {
  SendPushMessageRequestBody,
  SendPushMessageResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  UserIdInvalidError,
  SendPushMessageUseCase,
  ChannelAccessTokenInvalidError,
} from '../../use-case/send-push-message-use-case'

export const buildSendPushMessageFastifyHandler =
  ({
    sendPushMessageUseCase,
  }: {
    sendPushMessageUseCase: SendPushMessageUseCase
  }): MyRouteHandlerMethod<{
    Body: SendPushMessageRequestBody
    Reply: SendPushMessageResponseBody
  }> =>
  async (request, reply) => {
    const [, channelAccessToken] = request.headers.authorization!.split(' ')
    const requestBody = request.body

    const sendPushMessageUseCaseResult = await sendPushMessageUseCase({
      channelAccessToken,
      userId: requestBody.to,
    })

    if (
      sendPushMessageUseCaseResult instanceof ChannelAccessTokenInvalidError
    ) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid channel access token',
      }
    }

    if (sendPushMessageUseCaseResult instanceof UserIdInvalidError) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid user ID',
      }
    }

    reply.type('application/json').code(200)
    return {}
  }
