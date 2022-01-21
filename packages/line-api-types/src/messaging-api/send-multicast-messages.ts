/**
 * https://developers.line.biz/ja/reference/messaging-api/#send-multicast-message
 */
export interface SendMulticastMessagesRequestBody {
  to: ReadonlyArray<string>
  messages: ReadonlyArray<{
    type: string
    text: string
  }>
  notificationDisabled: boolean // default: false
}
export type SendMulticastMessagesResponseBody = {}
