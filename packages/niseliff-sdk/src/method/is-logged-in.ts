import liff from '@line/liff'

export const buildIsLoggedIn = (): typeof liff.isLoggedIn => () => true
