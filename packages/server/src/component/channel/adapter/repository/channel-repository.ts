import { JSONFile, Low } from 'lowdb'
import { Channel } from '../../domain/entity'
import { ChannelRepository } from '../../domain/repository'

type ChannelRecord = Channel

export type ChannelJson = ReadonlyArray<ChannelRecord>

export class ChannelLowRepository implements ChannelRepository {
  private readonly low: Low<ChannelJson>

  constructor() {
    const file = './tmp/channels.json'
    const adapter = new JSONFile<ChannelJson>(file)
    this.low = new Low(adapter)
  }

  async findByAccessToken(accessToken: string): Promise<Channel | undefined> {
    await this.low.read()
    const found = this.low.data?.find(
      (record) => record.accessToken === accessToken
    )
    if (found == null) {
      return undefined
    }

    return found
  }

  async findBySecret(secret: string): Promise<Channel | undefined> {
    await this.low.read()
    const found = this.low.data?.find((record) => record.secret === secret)
    if (found == null) {
      return undefined
    }

    return found
  }
}
