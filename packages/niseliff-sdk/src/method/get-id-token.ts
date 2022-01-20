import liff from '@line/liff'

export const buildGetIdToken = (): typeof liff.getIDToken => () =>
  localStorage.getItem('ID_TOKEN')
