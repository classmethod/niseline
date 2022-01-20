import liff from '@line/liff'

export const buildGetAccessToken = (): typeof liff.getAccessToken => () =>
  localStorage.getItem('ACCESS_TOKEN')
