export interface MessagingApiErrorDetail {
  message: string
  property: string
}

export interface MessagingApiErrorResponseBody {
  message: string
  details?: ReadonlyArray<MessagingApiErrorDetail>
}
