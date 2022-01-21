import {
  SendReplyMessageRequestBody,
  SendReplyMessageResponseBody,
} from '@niseline/line-api-types'
import { MyRouteHandlerMethod } from '../../../../util/handler'
import {
  ChannelAccessTokenInvalidError,
  ReplyTokenInvalidError,
  SendReplyMessageUseCase,
} from '../../use-case/send-reply-message-use-case'

export const buildSendReplyMessageFastifyHandler =
  ({
    sendReplyMessageUseCase,
  }: {
    sendReplyMessageUseCase: SendReplyMessageUseCase
  }): MyRouteHandlerMethod<{
    Body: SendReplyMessageRequestBody
    Reply: SendReplyMessageResponseBody
  }> =>
  async (request, reply) => {
    const [, channelAccessToken] = request.headers.authorization!.split(' ')
    const requestBody = request.body

    const sendReplyMessageUseCaseResult = await sendReplyMessageUseCase({
      channelAccessToken,
      userId: requestBody.replyToken,
    })

    if (
      sendReplyMessageUseCaseResult instanceof ChannelAccessTokenInvalidError
    ) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid channel access token',
      }
    }

    if (sendReplyMessageUseCaseResult instanceof ReplyTokenInvalidError) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid reply token',
      }
    }

    reply.type('application/json').code(200)
    return {}
  }
