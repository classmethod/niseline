import 'source-map-support/register'
import { fetch } from 'cross-fetch'
import {
  SaveChannelParams as SaveChannelParamsBody,
  SaveUserParams as SaveUserParamsBody,
} from './generated/api/@types'

export type SaveChannelParams = SaveChannelParamsBody
export type SaveUserParams = SaveUserParamsBody & { channelId: string }

export class NiselineClient {
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
