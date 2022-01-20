import liff from '@line/liff'

export const buildGetIsVideoAutoPlay =
  (): typeof liff.getIsVideoAutoPlay => () =>
    true
