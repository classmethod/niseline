import liff from '@line/liff'

export const buildReady = (): typeof liff.ready =>
  new Promise((resolve) => {
    resolve()
  })
