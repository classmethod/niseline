import liff from '@line/liff'

export const buildPermissionQuery =
  (): typeof liff.permission.query => async () => ({ state: 'granted' })
