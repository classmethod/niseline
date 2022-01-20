import liff from '@line/liff'

export const buildPermanentCreateUrlBy =
  (): typeof liff.permanentLink.createUrlBy => async () =>
    'https://example.com'
