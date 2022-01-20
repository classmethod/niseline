import { Channel } from './entity'

export interface ChannelRepository {
  findByAccessToken(accessToken: string): Promise<Channel | undefined>
  findBySecret(secret: string): Promise<Channel | undefined>
}
