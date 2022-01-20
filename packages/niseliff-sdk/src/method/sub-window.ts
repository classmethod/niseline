import liff from '@line/liff'

export const buildSubWindow = (): typeof liff.subWindow => ({
  on: () => {},
  off: () => {},
  open: async () => {},
  cancel: async () => ({
    status: '',
    result: '',
  }),
  submit: async () => ({
    status: '',
    result: '',
  }),
  close: async () => {},
  getAppData: async () => ({}),
})
