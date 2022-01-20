import liff from '@line/liff'

export const buildGetDecodedIdToken =
  (): typeof liff.getDecodedIDToken => () => {
    const userJson = localStorage.getItem('MY_USER')
    if (userJson == null) {
      return null
    }

    const user: {
      id: string
      name: string
      email: string
      picture: string
    } = JSON.parse(userJson)

    const result: {
      iss?: string
      sub?: string
      aud?: string
      exp?: number
      iat?: number
      auth_time?: number
      nonce?: string
      amr?: string[]
      name?: string
      picture?: string
      email?: string
    } = {
      sub: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    }
    return result
  }
