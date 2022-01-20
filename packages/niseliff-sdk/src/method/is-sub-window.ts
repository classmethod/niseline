import liff from '@line/liff'

export const buildIsSubWindow = (): typeof liff.isSubWindow => () => false
