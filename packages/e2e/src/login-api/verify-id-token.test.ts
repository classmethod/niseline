import fetch from 'node-fetch'
import { CONFIG } from '../config'

test('Verify ID token', async () => {
  const result = await fetch(
    new URL('/oauth2/v2.1/verify', CONFIG.BASE_URL).toString(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'id_token=DEFAULT_USER&client_id=1234567890',
    }
  )
  expect(result.ok).toBe(true)
})
