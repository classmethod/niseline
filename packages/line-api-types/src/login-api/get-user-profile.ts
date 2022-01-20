/**
 * https://developers.line.biz/ja/reference/line-login/#get-user-profile
 */
export interface GetUserProfileResponseBody {
  userId: string // 'U4af4980629...'
  displayName: string // 'Brown'
  pictureUrl: string // 'https://profile.line-scdn.net/abcdefghijklmn'
  statusMessage: string // 'Hello, LINE!'
}
