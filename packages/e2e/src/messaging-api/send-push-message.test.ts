import fetch from 'node-fetch'
import { CONFIG } from '../config'

test('Send push message', async () => {
  const url = new URL('/v2/bot/message/push', CONFIG.BASE_URL)
  const result = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: 'Bearer DEFAULT_USER',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'DEFAULT_USER',
      messages: [
        {
          type: 'text',
          text: 'Hello NiseLine!',
        },
      ],
    }),
  })
  expect(result.ok).toBe(true)
})
