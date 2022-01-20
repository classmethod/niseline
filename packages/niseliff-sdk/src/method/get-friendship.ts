import liff from '@line/liff'

// TODO Fetch result from server
export const buildGetFriendship =
  (): typeof liff.getFriendship => async () => ({
    friendFlag: true,
  })
