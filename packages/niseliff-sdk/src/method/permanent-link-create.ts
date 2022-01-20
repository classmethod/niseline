import liff from '@line/liff'

export const buildPermanentCreateUrl =
  (): typeof liff.permanentLink.createUrl => () =>
    'https://example.com'
