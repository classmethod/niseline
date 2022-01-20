/**
 * https://developers.line.biz/ja/reference/line-login/#verify-access-token
 */
export interface VerifyAccessTokenRequestQuery {
  access_token: string
}

export interface VerifyAccessTokenResponseBody {
  scope: string // 'profile'
  client_id: string // '1440057261'
  expires_in: number // 2591659
}
