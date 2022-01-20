import { Channel } from '../../domain/entity'
import {
  ShowChannelBySecretUseCase,
  ChannelNotFoundError as ShowChannelBySecretUseCaseChannelNotFoundError,
} from '../../use-case/show-channel-by-secret-use-case'

export class ChannelNotFoundError extends Error {}

export type ShowChannelBySecretComponentHandler = (
  id: string
) => Promise<Channel | ChannelNotFoundError>

export const buildShowChannelBySecretComponentHandler =
  ({
    showChannelBySecretUseCase,
  }: {
    showChannelBySecretUseCase: ShowChannelBySecretUseCase
  }) =>
  async (secret: string) => {
    const showChannelBySecretUseCaseResult = await showChannelBySecretUseCase(
      secret
    )
    if (
      showChannelBySecretUseCase instanceof
      ShowChannelBySecretUseCaseChannelNotFoundError
    ) {
      return new ChannelNotFoundError()
    }

    return showChannelBySecretUseCaseResult
  }
