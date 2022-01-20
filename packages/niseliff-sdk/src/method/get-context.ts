import liff from '@line/liff'

export const buildGetContext = (): typeof liff.getContext => () => null

// TODO
// Working about return value:
// {
//   type: 'none',
//   scope: ['profile', 'openid'],
// }
