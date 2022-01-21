import { ChannelRepository, UserRepository } from '../domain/repository'

export class ChannelAccessTokenInvalidError extends Error {}
export class UserIdInvalidError extends Error {}

export type SendMulticastMessageUseCase = (params: {
  userIds: ReadonlyArray<string>
  channelAccessToken: string
}) => Promise<undefined | ChannelAccessTokenInvalidError | UserIdInvalidError>

export const buildSendMulticastMessageUseCase =
  ({
    userRepository,
    channelRepository,
  }: {
    userRepository: UserRepository
    channelRepository: ChannelRepository
  }): SendMulticastMessageUseCase =>
  async ({ userIds, channelAccessToken }) => {
    const channel = await channelRepository.findByAccessToken(
      channelAccessToken
    )
    if (channel == null) {
      return new ChannelAccessTokenInvalidError()
    }

    const users = await Promise.all(userIds.map(userRepository.findUser))
    if (users.includes(undefined)) {
      return new UserIdInvalidError()
    }

    return undefined
  }
