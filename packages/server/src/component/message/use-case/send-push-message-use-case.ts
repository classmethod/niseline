import { ChannelRepository, UserRepository } from '../domain/repository'

export class ChannelAccessTokenInvalidError extends Error {}
export class UserIdInvalidError extends Error {}

export type SendPushMessageUseCase = (params: {
  userId: string
  channelAccessToken: string
}) => Promise<undefined | ChannelAccessTokenInvalidError | UserIdInvalidError>

export const buildSendPushMessageUseCase =
  ({
    userRepository,
    channelRepository,
  }: {
    userRepository: UserRepository
    channelRepository: ChannelRepository
  }): SendPushMessageUseCase =>
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
      return new UserIdInvalidError()
    }

    return undefined
  }
