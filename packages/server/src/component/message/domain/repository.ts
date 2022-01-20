import { Channel, User } from './entity'

export interface UserRepository {
  findUser(id: string): Promise<User | undefined>
}

export interface ChannelRepository {
  findByAccessToken(accessToken: string): Promise<Channel | undefined>
}
