import 'source-map-support/register'
import cors from 'cors'
import express from 'express'
import * as openApiValidator from 'express-openapi-validator'
import * as serviceIds from './di-containers/service-ids'
import { setupContainer } from './di-containers/setup-container'
import {
  ErrorResult,
  MessageResult,
  SaveUserParams,
  VerifyAccessTokenParams,
  VerifyAccessTokenResult,
  VerifyIdTokenParams,
  VerifyIdTokenResult,
} from './generated/api/@types'
import { UserRepository } from './models/user/user-repository'
import {
  buildLocalDdbClient,
  buildUsersTableDef,
  refreshDdbTable,
} from './testing-utils/ddb'
import { errorToJson } from './utils/error'
import { Logger } from './utils/logger'

const main = async () => {
  const ddbClient = buildLocalDdbClient({})
  const container = setupContainer({ ddbClient })
  await refreshDdbTable({
    ddbClient,
    tableName: container.get<string>(serviceIds.USERS_TABLE_NAME),
    tableDef: buildUsersTableDef(
      container.get<string>(serviceIds.USERS_TABLE_NAME)
    ),
  })

  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
  app.use(
    openApiValidator.middleware({
      apiSpec: '../../openapi.yml',
    })
  )

  /**
   * NiseLine Original API
   */
  app.get('/niseline/api/ping', (_req, res) => {
    const resBody: MessageResult = {
      message: 'Pong.',
    }
    return res.send(resBody)
  })

  app.post('/niseline/api/channels/:channelId/users', async (req, res) => {
    const logger = container.get<Logger>(serviceIds.LOGGER)
    try {
      const userRepository = container.get<UserRepository>(
        serviceIds.USER_REPOSITORY
      )
      const reqBody: SaveUserParams = req.body
      const { channelId } = req.params

      await userRepository.save({
        id: reqBody.id,
        accessToken: reqBody.accessToken,
        idToken: reqBody.idToken,
        email: reqBody.email,
        name: reqBody.name,
        picture: reqBody.picture,
        channelId,
      })

      const resBody: MessageResult = {
        message: 'OK.',
      }
      return res.send(resBody)
    } catch (e: unknown) {
      logger.error({ error: errorToJson(e as Error) })
      return res.status(500).send({})
    }
  })

  app.post('/niseline/api/channels/:channelId/users', async (req, res) => {
    const logger = container.get<Logger>(serviceIds.LOGGER)
    try {
      const userRepository = container.get<UserRepository>(
        serviceIds.USER_REPOSITORY
      )
      const reqBody: SaveUserParams = req.body
      const { channelId } = req.params

      await userRepository.save({
        id: reqBody.id,
        accessToken: reqBody.accessToken,
        idToken: reqBody.idToken,
        email: reqBody.email,
        name: reqBody.name,
        picture: reqBody.picture,
        channelId,
      })

      const resBody: MessageResult = {
        message: 'OK.',
      }
      return res.send(resBody)
    } catch (e: unknown) {
      logger.error({ error: errorToJson(e as Error) })
      return res.status(500).send({})
    }
  })

  /**
   * Login API
   */
  app.get('/oauth2/v2.1/verify', async (req, res) => {
    const logger = container.get<Logger>(serviceIds.LOGGER)
    try {
      const userRepository = container.get<UserRepository>(
        serviceIds.USER_REPOSITORY
      )

      const {
        verifyAccessTokenParams: { access_token: accessToken },
      } = req.query as {
        verifyAccessTokenParams: VerifyAccessTokenParams
      }

      const user = await userRepository.findByAccessToken(accessToken as string)
      if (user == null) {
        const errorResult: ErrorResult = {
          error: 'invalid_request',
          error_description: 'access token expired',
        }
        return res.status(400).send(errorResult)
      }

      const resBody: VerifyAccessTokenResult = {
        scope: 'profile',
        client_id: '1234567890',
        expires_in: 2591659,
      }
      return res.send(resBody)
    } catch (e: unknown) {
      logger.error({ error: errorToJson(e as Error) })
      return res.status(500).send({})
    }
  })

  app.post('/oauth2/v2.1/verify', async (req, res) => {
    const logger = container.get<Logger>(serviceIds.LOGGER)
    try {
      const userRepository = container.get<UserRepository>(
        serviceIds.USER_REPOSITORY
      )
      const reqBody: VerifyIdTokenParams = req.body
      const { id_token: idToken } = reqBody

      const user = await userRepository.findByIdToken(idToken as string)
      if (user == null) {
        const errorResult: ErrorResult = {
          error: 'invalid_request',
          error_description: 'Invalid IdToken.',
        }
        return res.status(400).send(errorResult)
      }

      const resBody: VerifyIdTokenResult = {
        iss: 'http://example.com',
        sub: user.id,
        aud: '1234567890',
        exp: 1504169092,
        iat: 1504263657,
        nonce: '0987654asdf',
        amr: ['pwd'],
        name: user.name,
        picture: user.picture,
        email: user.email,
      }
      return res.send(resBody)
    } catch (e: unknown) {
      logger.error({ error: errorToJson(e as Error) })
      return res.status(500).send({})
    }
  })

  // app.get('/v2/profile', (req, res) => {})

  // /**
  //  * Messaging API
  //  */
  // app.post('/v2/bot/message/reply', (req, res) => {})

  // app.post('/v2/bot/message/push', (req, res) => {})

  const port = process.env.PORT ?? '3000'

  app.listen(Number(port), '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('start')
  })
}

main()
