import { setTimeout } from 'timers/promises'
import { Express } from 'express'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { beforeAll, expect, test } from 'vitest'
import * as serviceIds from '../di-containers/service-ids'
import { setupContainer } from '../di-containers/setup-container'
import { SaveChannelParams, SaveUserParams } from '../generated/api/@types'
import {
  buildChannelsTableDef,
  buildLocalDdbClient,
  buildUsersTableDef,
  refreshDdbTable,
} from '../testing-utils/ddb'
import { buildApp } from './app'

let app: Express
beforeAll(async () => {
  const ddbClient = buildLocalDdbClient({})
  const container = setupContainer({ ddbClient })
  await refreshDdbTable({
    ddbClient,
    tableName: container.get<string>(serviceIds.CHANNELS_TABLE_NAME),
    tableDef: buildChannelsTableDef(
      container.get<string>(serviceIds.CHANNELS_TABLE_NAME)
    ),
  })
  await refreshDdbTable({
    ddbClient,
    tableName: container.get<string>(serviceIds.USERS_TABLE_NAME),
    tableDef: buildUsersTableDef(
      container.get<string>(serviceIds.USERS_TABLE_NAME)
    ),
  })
  app = buildApp({ container })
})

test('Call ping.', async () => {
  const res = await request(app)
    .get('/niseline/api/ping')
    .set('Accept', 'application/json')

  expect(res.status).toBe(200)
  expect(res.body).toEqual({ message: 'Pong.' })
})

test('Save a channel.', async () => {
  const body: SaveChannelParams = {
    id: '1234567890',
  }
  const res = await request(app)
    .post('/niseline/api/channels')
    .send(body)
    .set('Content-Type', 'application/json')

  expect(res.status).toBe(200)
  expect(res.body).toEqual({ message: 'OK.' })
})

test('Save a channel and a user.', async () => {
  const channelId = uuidV4()
  const userId = uuidV4()
  const saveChannelReqBody: SaveChannelParams = {
    id: channelId,
  }
  const saveChannelRes = await request(app)
    .post('/niseline/api/channels')
    .send(saveChannelReqBody)
    .set('Content-Type', 'application/json')
  expect(saveChannelRes.ok).toBe(true)
  expect(saveChannelRes.body).toEqual({ message: 'OK.' })

  await setTimeout(100)

  const saveUserReqBody: SaveUserParams = {
    id: userId,
    accessToken: 'XXXXXX',
    idToken: 'XXXXXX',
    email: 'taro@example.com',
    name: 'Taro Niseline',
    picture: 'https://example.com/aBcdefg123456',
  }
  const saveUserRes = await request(app)
    .post(`/niseline/api/channels/${channelId}/users`)
    .send(saveUserReqBody)
    .set('Content-Type', 'application/json')

  expect(saveUserRes.status).toBe(200)
  expect(saveUserRes.body).toEqual({ message: 'OK.' })
})
