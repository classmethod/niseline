import { ChannelRepository, UserRepository } from '../domain/repository'

export class ChannelAccessTokenInvalidError extends Error {}
export class ReplyTokenInvalidError extends Error {}

export type SendReplyMessageUseCase = (params: {
  userId: string
  channelAccessToken: string
}) => Promise<
  undefined | ChannelAccessTokenInvalidError | ReplyTokenInvalidError
>

export const buildSendReplyMessageUseCase =
  ({
    userRepository,
    channelRepository,
  }: {
    userRepository: UserRepository
    channelRepository: ChannelRepository
  }): SendReplyMessageUseCase =>
  async ({
    userId,
    channelAccessToken,
  }: {
    userId: string
    channelAccessToken: string
  }) => {
    const channel = await channelRepository.findByAccessToken(
      channelAccessToken
    )
    if (channel == null) {
      return new ChannelAccessTokenInvalidError()
    }

    const findUserResult = await userRepository.findUser(userId)
    if (findUserResult == null) {
      return new ReplyTokenInvalidError()
    }

    return undefined
  }
