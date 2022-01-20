export interface SendReplyMessageRequestBody {
  replyToken: string // 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  messages: ReadonlyArray<{
    type: string // 'text'
    text: string // 'Hello, user'
  }>
}

export type SendReplyMessageResponseBody = {}
