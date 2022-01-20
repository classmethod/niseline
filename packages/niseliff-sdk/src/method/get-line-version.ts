import liff from '@line/liff'

export const buildGetLineVersion =
  (lineVersion: string): typeof liff.getLineVersion =>
  () =>
    lineVersion
