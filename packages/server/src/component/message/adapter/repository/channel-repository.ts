import {
  ChannelNotFoundError as ChannelByAccessTokenNotFoundError,
  ShowChannelByAccessTokenComponentHandler,
} from '../../../channel/adapter/handler/show-channel-by-access-token-component-handler'
import {
  ChannelNotFoundError as ChannelBySecretNotFoundError,
  ShowChannelBySecretComponentHandler,
} from '../../../channel/adapter/handler/show-channel-by-secret-component-handler'
import { Channel } from '../../domain/entity'
import { ChannelRepository } from '../../domain/repository'

export class ChannelComponentRepository implements ChannelRepository {
  private readonly showChannelByAccessTokenComponentHandler: ShowChannelByAccessTokenComponentHandler

  private readonly showChannelBySecretComponentHandler: ShowChannelBySecretComponentHandler

  constructor({
    showChannelByAccessTokenComponentHandler,
    showChannelBySecretComponentHandler,
  }: {
    showChannelByAccessTokenComponentHandler: ShowChannelByAccessTokenComponentHandler
    showChannelBySecretComponentHandler: ShowChannelBySecretComponentHandler
  }) {
    this.showChannelByAccessTokenComponentHandler =
      showChannelByAccessTokenComponentHandler
    this.showChannelBySecretComponentHandler =
      showChannelBySecretComponentHandler
  }

  async findByAccessToken(accessToken: string): Promise<Channel | undefined> {
    const showChannelResult =
      await this.showChannelByAccessTokenComponentHandler(accessToken)

    if (showChannelResult instanceof ChannelByAccessTokenNotFoundError) {
      return undefined
    }

    return showChannelResult
  }

  async findBySecret(secret: string): Promise<Channel | undefined> {
    const showChannelResult = await this.showChannelBySecretComponentHandler(
      secret
    )

    if (showChannelResult instanceof ChannelBySecretNotFoundError) {
      return undefined
    }

    return showChannelResult
  }
}
