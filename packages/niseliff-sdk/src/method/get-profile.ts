import liff from '@line/liff'

export const buildGetProfile = (): typeof liff.getProfile => async () => {
  const userJson = localStorage.getItem('MY_USER')
  if (userJson == null) {
    throw new Error('COULD_NOT_GET_PROFILE')
  }

  const user: {
    id: string
    name: string
    email: string
    picture: string
  } = JSON.parse(userJson)

  return {
    userId: user.id,
    displayName: user.name,
    pictureUrl: user.picture,
  }
}
