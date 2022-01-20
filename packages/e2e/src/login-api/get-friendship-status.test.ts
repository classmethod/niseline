import fetch from 'node-fetch'
import { CONFIG } from '../config'

test('Get friendship status', async () => {
  const url = new URL('/friendship/v1/status', CONFIG.BASE_URL)
  const result = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: 'Bearer DEFAULT_USER',
    },
  })
  expect(result.ok).toBe(true)
})
