import liff from '@line/liff'
import { User } from '../type'
import { Logger } from '../util/logger'

export const buildInit =
  ({
    logger,
    clientEndpoint,
    niseliffServerEndpoint,
  }: {
    logger: Logger
    clientEndpoint: string
    niseliffServerEndpoint: string
  }): typeof liff.init =>
  async (): ReturnType<typeof liff.init> => {
    logger.info('Init start')

    /**
     * Check user info
     */
    const userStr = localStorage.getItem('MY_USER')
    if (userStr != null) {
      logger.info(`Get my user info successfully`)
      return
    }

    logger.info('Not exists my user info')

    /**
     * Check userId
     */
    const urlSearchParams = new URLSearchParams(window.location.search)
    const userId = urlSearchParams.get('userId')
    if (userId != null) {
      const result = await fetch(
        new URL(
          `/niseline/api/users/${userId}`,
          niseliffServerEndpoint
        ).toString()
      )
      if (!result.ok) {
        logger.error(`Invalid response from GET /niseline/api/users/${userId}`)
        return
      }

      const json: User = await result.json()
      localStorage.setItem('MY_USER', JSON.stringify(json))
      logger.info('Get and set my user info successfully')
      window.location.reload()
      return
    }

    /**
     * Start authorization flow
     */
    const url = new URL('/niseline/authorize', niseliffServerEndpoint)
    url.search = new URLSearchParams({
      redirectUri: clientEndpoint,
    }).toString()
    window.location.href = url.toString()
  }
