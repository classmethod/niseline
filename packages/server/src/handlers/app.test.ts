import { setTimeout } from 'timers/promises'
import { fetch } from 'cross-fetch'
import { v4 as uuidV4 } from 'uuid'
import { expect, test } from 'vitest'
import { SaveChannelParams, SaveUserParams } from '../generated/api/@types'

const baseUrl = 'http://localhost:3001'

test('Call ping.', async () => {
  const res = await fetch(new URL('/niseline/api/ping', baseUrl).toString(), {
    method: 'GET',
  })
  expect(res.ok).toBe(true)
  expect(await res.json()).toEqual({ message: 'Pong.' })
})

test('Save a channel.', async () => {
  const body: SaveChannelParams = {
    id: '1234567890',
  }
  const res = await fetch(
    new URL('/niseline/api/channels', baseUrl).toString(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  expect(res.ok).toBe(true)
  expect(await res.json()).toEqual({ message: 'OK.' })
})

test('Save a channel and a user.', async () => {
  const channelId = uuidV4()
  const userId = uuidV4()
  const saveChannelReqBody: SaveChannelParams = {
    id: channelId,
  }
  const saveChannelRes = await fetch(
    new URL('/niseline/api/channels', baseUrl).toString(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveChannelReqBody),
    }
  )
  expect(saveChannelRes.ok).toBe(true)
  expect(await saveChannelRes.json()).toEqual({ message: 'OK.' })

  await setTimeout(100)

  const saveUserReqBody: SaveUserParams = {
    id: userId,
    accessToken: 'XXXXXX',
    idToken: 'XXXXXX',
    email: 'taro@example.com',
    name: 'Taro Niseline',
    picture: 'https://example.com/aBcdefg123456',
  }
  const saveUserRes = await fetch(
    new URL(`/niseline/api/channels/${channelId}/users`, baseUrl).toString(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(saveUserReqBody),
    }
  )
  expect(saveUserRes.status).toBe(200)
  expect(saveUserRes.ok).toBe(true)
  expect(await saveUserRes.json()).toEqual({ message: 'OK.' })
})
