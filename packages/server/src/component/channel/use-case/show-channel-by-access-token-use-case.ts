import { Channel } from '../domain/entity'
import { ChannelRepository } from '../domain/repository'

export class ChannelNotFoundError extends Error {}

export type ShowChannelByAccessTokenUseCase = (
  id: string
) => Promise<Channel | ChannelNotFoundError>

export const buildShowChannelByAccessTokenUseCase =
  ({
    channelRepository,
  }: {
    channelRepository: ChannelRepository
  }): ShowChannelByAccessTokenUseCase =>
  async (accessToken: string) => {
    const channel = await channelRepository.findByAccessToken(accessToken)
    if (channel == null) {
      return new ChannelNotFoundError()
    }

    return channel
  }
