import 'source-map-support/register'
import cors from 'cors'
import express from 'express'
import { MessageResult } from './generated/api/@types'

const app = express()
app.use(cors())
app.use(express.json())

/**
 * NiseLine original
 */
app.get('/niseline/api/ping', (req, res) => {
  const responseBody: MessageResult = {
    message: 'Pong.',
  }
  return res.send(responseBody)
})

// app.get('/niseline/authorize', (req, res) => {})

// app.post('/niseline/login', (req, res) => {})

// /**
//  * Login API
//  */
// app.get('/oauth2/v2.1/verify', (req, (res) => {}))

// app.post('/oauth2/v2.1/verify', (req, res) => {})

// app.get('/v2/profile', (req, res) => {})

// app.get('/friendship/v1/status', (req, res) => {})

// /**
//  * Messaging API
//  */
// app.post('/v2/bot/message/reply', (req, res) => {})

// app.post('/v2/bot/message/push', (req, res) => {})

const port = process.env.PORT ?? '3000'

app.listen(Number(port), '0.0.0.0', () => {
  console.log('start')
})
