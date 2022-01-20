import liff from '@line/liff'

// TODO: open external
export const buildOpenWindow = (): typeof liff.openWindow => (params) => {
  window.location.href = params.url
}
