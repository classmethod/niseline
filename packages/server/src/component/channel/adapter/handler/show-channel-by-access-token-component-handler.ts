import { Channel } from '../../domain/entity'
import {
  ShowChannelByAccessTokenUseCase,
  ChannelNotFoundError as ShowChannelByAccessTokenUseCaseChannelNotFoundError,
} from '../../use-case/show-channel-by-access-token-use-case'

export class ChannelNotFoundError extends Error {}

export type ShowChannelByAccessTokenComponentHandler = (
  id: string
) => Promise<Channel | ChannelNotFoundError>

export const buildShowChannelByAccessTokenComponentHandler =
  ({
    showChannelByAccessTokenUseCase,
  }: {
    showChannelByAccessTokenUseCase: ShowChannelByAccessTokenUseCase
  }) =>
  async (accessToken: string) => {
    const showChannelByAccessTokenUseCaseResult =
      await showChannelByAccessTokenUseCase(accessToken)
    if (
      showChannelByAccessTokenUseCase instanceof
      ShowChannelByAccessTokenUseCaseChannelNotFoundError
    ) {
      return new ChannelNotFoundError()
    }

    return showChannelByAccessTokenUseCaseResult
  }
