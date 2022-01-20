import fetch from 'node-fetch'
import { CONFIG } from '../config'

test('Verify access token', async () => {
  const url = new URL('/oauth2/v2.1/verify', CONFIG.BASE_URL)
  url.search = new URLSearchParams({ access_token: 'DEFAULT_USER' }).toString()
  const result = await fetch(url.toString(), {
    method: 'GET',
  })
  expect(result.ok).toBe(true)
})
