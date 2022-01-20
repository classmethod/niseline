import liff from '@line/liff'

export const buildGetAId = (): typeof liff.getAId => () => ({
  id: '',
  t: false,
})
