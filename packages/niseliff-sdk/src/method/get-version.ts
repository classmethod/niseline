import liff from '@line/liff'

export const buildGetVersion =
  (version: string): typeof liff.getVersion =>
  () =>
    version
