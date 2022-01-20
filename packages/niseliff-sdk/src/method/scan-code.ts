import liff from '@line/liff'

export const buildScanCode = (): typeof liff.scanCode => async () => ({
  value: null,
})
