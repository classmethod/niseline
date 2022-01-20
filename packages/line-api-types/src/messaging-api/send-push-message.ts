export interface SendPushMessageRequestBody {
  to: string // 'U4af4980629...'
  messages: ReadonlyArray<{
    type: string // 'text'
    text: string // 'Hello, user'
  }>
}

export type SendPushMessageResponseBody = {}
