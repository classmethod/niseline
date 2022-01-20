/* eslint-disable camelcase */

export interface ErrorResponseBody {
  error: string // 'invalid_request'
  error_description: string // 'access token expired'
}

export interface MessagingApiErrorDetail {
  message: string
  property: string
}

export interface MessagingApiErrorResponseBody {
  message: string
  details?: ReadonlyArray<MessagingApiErrorDetail>
}
