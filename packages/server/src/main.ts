import 'source-map-support/register'
import cors from 'cors'
import express from 'express'
import * as openApiValidator from 'express-openapi-validator'
import * as serviceIds from './di-containers/service-ids'
import { setupContainer } from './di-containers/setup-container'
import {
  ErrorResult,
  MessageResult,
  VerifyAccessTokenResult,
} from './generated/api/@types'
import { UserRepository } from './models/user/user-repository'
import { errorToJson } from './utils/error'
import { Logger } from './utils/logger'

const container = setupContainer()

const app = express()
app.use(cors())
app.use(express.json())
app.use(
  openApiValidator.middleware({
    apiSpec: '../../openapi.yml',
  })
)

/**
 * NiseLine Original API
 */
app.get('/niseline/api/ping', (req, res) => {
  const responseBody: MessageResult = {
    message: 'Pong.',
  }
  return res.send(responseBody)
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
    const { access_token: userId } = req.query

    const user = await userRepository.findById(userId as string)
    if (user == null) {
      const errorResult: ErrorResult = {
        error: 'invalid_request',
        error_description: 'access token expired',
      }
      return res.status(400).send(errorResult)
    }

    const responseBody: VerifyAccessTokenResult = {
      scope: 'profile',
      client_id: '1234567890',
      expires_in: 2591659,
    }
    return res.send(responseBody)
  } catch (e: unknown) {
    logger.error({ error: errorToJson(e as Error) })
    return res.status(500).send({})
  }
})

// app.post('/oauth2/v2.1/verify', (req, res) => {})

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
