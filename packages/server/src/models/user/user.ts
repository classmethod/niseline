export type UserId = string

export interface User {
  /**
   * @example 'U123'
   */
  id: UserId
  /**
   * @example 'XXXXXX'
   */
  accessToken: string
  /**
   * @example 'XXXXXX'
   */
  idToken: string
  /**
   * @example 'taro.niseline@example.com'
   */
  email: string
  /**
   * @example 'Taro Niseline'
   */
  name: string
  /**
   * @example 'https://example.com/aBcdefg123456'
   */
  picture: string
  /**
   * @example '1234567890'
   */
  channelId: string
}
