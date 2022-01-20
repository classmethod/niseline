import fetch from 'node-fetch'
import { CONFIG } from '../config'

test('Get user profile', async () => {
  const url = new URL('/v2/profile', CONFIG.BASE_URL)
  const result = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: 'Bearer DEFAULT_USER',
    },
  })
  expect(result.ok).toBe(true)
})
