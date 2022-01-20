import liff from '@line/liff'

export const buildLogout = (): typeof liff.logout => () => {
  localStorage.clear()
}
