import { Channel } from '../domain/entity'
import { ChannelRepository } from '../domain/repository'

export class ChannelNotFoundError extends Error {}

export type ShowChannelBySecretUseCase = (
  id: string
) => Promise<Channel | ChannelNotFoundError>

export const buildShowChannelBySecretUseCase =
  ({
    channelRepository,
  }: {
    channelRepository: ChannelRepository
  }): ShowChannelBySecretUseCase =>
  async (secret: string) => {
    const channel = await channelRepository.findBySecret(secret)
    if (channel == null) {
      return new ChannelNotFoundError()
    }

    return channel
  }
