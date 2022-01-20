import liff from '@line/liff'

export const buildGetOs =
  (os: 'ios' | 'android' | 'web' | undefined): typeof liff.getOS =>
  () =>
    os
