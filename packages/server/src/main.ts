/* eslint-disable camelcase */
import 'source-map-support/register'
import ejs from 'ejs'
import Fastify, { RouteHandlerMethod } from 'fastify'
import fastifyCors from 'fastify-cors'
import fastifyFormBody from 'fastify-formbody'
import pointOfView from 'point-of-view'
import { bootstrap } from './di/bootstrap'
import { DI_TYPE } from './di/type'
import { initLowDb } from './util/db/lowdb'

const fastify = Fastify({
  logger: true,
})
fastify.register(fastifyCors)
fastify.register(fastifyFormBody)
fastify.register(pointOfView, {
  engine: {
    ejs,
  },
})

const container = bootstrap()

/**
 * NiseLine original
 */
fastify.get(
  '/niseline/api/ping',
  container.get<RouteHandlerMethod>(DI_TYPE.DEBUG_PING_HANDLER)
)
fastify.post(
  '/niseline/api/users',
  container.get<RouteHandlerMethod>(DI_TYPE.DEBUG_REGISTER_USER_HANDLER)
)
fastify.get(
  '/niseline/api/users/:id',
  container.get<RouteHandlerMethod>(DI_TYPE.FIND_USER_BY_ID_FASTIFY_HANDLER)
)
fastify.get(
  '/niseline/authorize',
  container.get<RouteHandlerMethod>(DI_TYPE.AUTHORIZE_FASTIFY_HANDLER)
)
fastify.post(
  '/niseline/login',
  container.get<RouteHandlerMethod>(DI_TYPE.LOGIN_FASTIFY_HANDLER)
)

/**
 * Login API
 */
fastify.get(
  '/oauth2/v2.1/verify',
  container.get<RouteHandlerMethod>(DI_TYPE.VERIFY_ACCESS_TOKEN_FASTIFY_HANDLER)
)
fastify.post(
  '/oauth2/v2.1/verify',
  container.get<RouteHandlerMethod>(DI_TYPE.VERIFY_ID_TOKEN_FASTIFY_HANDLER)
)
fastify.get(
  '/v2/profile',
  container.get<RouteHandlerMethod>(DI_TYPE.GET_USER_PROFILE_FASTIFY_HANDLER)
)
fastify.get(
  '/friendship/v1/status',
  container.get<RouteHandlerMethod>(
    DI_TYPE.GET_FRIENDSHIP_STATUS_FASTIFY_HANDLER
  )
)

/**
 * Messaging API
 */
fastify.post(
  '/v2/bot/message/reply',
  container.get<RouteHandlerMethod>(DI_TYPE.SEND_REPLY_MESSAGE_FASTIFY_HANDLER)
)
fastify.post(
  '/v2/bot/message/push',
  container.get<RouteHandlerMethod>(DI_TYPE.SEND_PUSH_MESSAGE_FASTIFY_HANDLER)
)

initLowDb()

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err
})
