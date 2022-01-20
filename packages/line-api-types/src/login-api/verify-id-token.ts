/**
 * https://developers.line.biz/ja/reference/line-login/#verify-id-token
 */
export interface VerifyIdTokenRequestBody {
  id_token: string
  client_id: string
}

export interface VerifyIdTokenResponseBody {
  iss: string // 'https://access.line.me'
  sub: string // 'U1234567890abcdef1234567890abcdef'
  aud: string // '1234567890'
  exp: number // 1504169092
  iat: number // 1504263657
  nonce: string // '0987654asdf'
  amr: ReadonlyArray<string> // ['pwd']
  name: string // 'Taro Line'
  picture: string // 'https://sample_line.me/aBcdefg123456'
  email: string // 'taro.line@example.com'
}
