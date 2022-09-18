import { Channel, ChannelId } from './channel'

export interface ChannelRepository {
  save: (channel: Channel) => Promise<void>
  findById: (id: ChannelId) => Promise<Channel | undefined>
}
