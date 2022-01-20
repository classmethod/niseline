import liff from '@line/liff'

export const buildIsApiAvailable = (): typeof liff.isApiAvailable => () => true
