import 'source-map-support/register'
import { fetch } from 'cross-fetch'
import {
  SaveChannelParams,
  SaveUserParams as SaveUserParamsBody,
} from './generated/api/@types'

export { SaveChannelParams } from './generated/api/@types'

export type SaveUserParams = SaveUserParamsBody & { channelId: string }

export interface NiselineClient {
  saveChannel: (params: SaveChannelParams) => Promise<void>
  saveUser: (params: SaveUserParams) => Promise<void>
}

export class NiselineClientImpl implements NiselineClient {
  private readonly apiUrl: string

  constructor({ apiUrl }: { apiUrl: string }) {
    this.apiUrl = apiUrl
  }

  async saveChannel(params: SaveChannelParams) {
    await fetch(new URL('/niseline/api/channels', this.apiUrl).toString(), {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  async saveUser(params: SaveUserParams) {
    const { channelId, ...body } = params
    await fetch(
      new URL(
        `/niseline/api/channels/${channelId}/users`,
        this.apiUrl
      ).toString(),
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
  }
}
