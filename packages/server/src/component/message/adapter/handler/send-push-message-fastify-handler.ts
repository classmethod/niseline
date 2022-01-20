import { RouteHandlerMethod } from 'fastify'
import {
  UserIdInvalidError,
  SendPushMessageUseCase,
  ChannelAccessTokenInvalidError,
} from '../../use-case/send-push-message-use-case'

interface SendPushMessageRequestBody {
  to: string // 'U4af4980629...'
  messages: ReadonlyArray<{
    type: string // 'text'
    text: string // 'Hello, user'
  }>
}

type SendPushMessageResponseBody = {}

export const buildSendPushMessageFastifyHandler =
  ({
    sendPushMessageUseCase,
  }: {
    sendPushMessageUseCase: SendPushMessageUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const [, channelAccessToken] = request.headers.authorization!.split(' ')
    const requestBody = request.body as SendPushMessageRequestBody

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
        message: 'Invalid reply token',
      }
    }

    reply.type('application/json').code(200)
    return {} as SendPushMessageResponseBody
  }
