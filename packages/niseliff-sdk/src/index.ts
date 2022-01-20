/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { buildCloseWindow } from './method/close-window'
import { buildGetAccessToken } from './method/get-access-token'
import { buildGetContext } from './method/get-context'
import { buildGetDecodedIdToken } from './method/get-decoded-id-token'
import { buildGetFriendship } from './method/get-friendship'
import { buildGetIdToken } from './method/get-id-token'
import { buildGetLanguage } from './method/get-language'
import { buildGetLineVersion } from './method/get-line-version'
import { buildGetOs } from './method/get-os'
import { buildGetProfile } from './method/get-profile'
import { buildGetVersion } from './method/get-version'
import { buildId } from './method/id'
import { buildInit } from './method/init'
import { buildInitPlugins } from './method/init-plugins'
import { buildIsApiAvailable } from './method/is-api-available'
import { buildIsInClient } from './method/is-in-client'
import { buildIsLoggedIn } from './method/is-logged-in'
import { buildLogin } from './method/login'
import { buildLogout } from './method/logout'
import { buildOpenWindow } from './method/open-window'
import { buildPermanentCreateUrl } from './method/permanent-link-create'
import { buildPermanentCreateUrlBy } from './method/permanent-link-create-url-by'
import { buildPermanentLinkSetExtraQueryParam } from './method/permanent-link-set-extra-query-param'
import { buildPermissionQuery } from './method/permission-query'
import { buildPermissionRequestAll } from './method/permission-request-all'
import { buildReady } from './method/ready'
import { buildScanCode } from './method/scan-code'
import { buildScanCodeV2 } from './method/scan-code-v2'
import { buildSendMessages } from './method/send-messages'
import { buildShareTargetPicker } from './method/share-target-picker'
import { ConsoleLogger, Logger } from './util/logger'

export const buildNiseliff = (params?: {
  clientEndpoint?: string
  niseliffServerEndpoint?: string
  liffId?: string
  os?: 'ios' | 'android' | 'web' | undefined
  language?: string
  version?: string
  lineVersion?: string
  isInClient?: boolean
}): Omit<
  Liff,
  | 'getAId'
  | 'getProfilePlus'
  | 'getIsVideoAutoPlay'
  | 'subWindow'
  | 'isSubWindow'
  | 'use'
  | '_dispatchEvent'
  | '_call'
  | '_addListener'
  | '_removeListener'
  | '_postMessage'
> => {
  const logger: Logger = new ConsoleLogger()
  const clientEndpoint = params?.clientEndpoint ?? window.location.origin
  const niseliffServerEndpoint =
    params?.niseliffServerEndpoint ?? 'http://localhost:3000'
  const liffId = params?.liffId ?? 'DEFAULT_LIFF_ID'
  const os = params?.os ?? 'web'
  const language = params?.language ?? 'ja'
  const version = params?.version ?? '2.16.1'
  const lineVersion = params?.lineVersion ?? '1.0.0'
  const isInClient = params?.isInClient ?? false

  return {
    id: buildId(liffId),
    ready: buildReady(),
    init: buildInit({ logger, clientEndpoint, niseliffServerEndpoint }),
    getOS: buildGetOs(os),
    getLanguage: buildGetLanguage(language),
    getVersion: buildGetVersion(version),
    getLineVersion: buildGetLineVersion(lineVersion),
    isInClient: buildIsInClient(isInClient),
    isLoggedIn: buildIsLoggedIn(),
    logout: buildLogout(),
    getAccessToken: buildGetAccessToken(),
    getIDToken: buildGetIdToken(),
    isApiAvailable: buildIsApiAvailable(),
    login: buildLogin(),
    getDecodedIDToken: buildGetDecodedIdToken(),
    getContext: buildGetContext(),
    getProfile: buildGetProfile(),
    permission: {
      query: buildPermissionQuery(),
      requestAll: buildPermissionRequestAll(),
    },
    getFriendship: buildGetFriendship(),
    permanentLink: {
      createUrlBy: buildPermanentCreateUrlBy(),
      createUrl: buildPermanentCreateUrl(),
      setExtraQueryParam: buildPermanentLinkSetExtraQueryParam(),
    },
    sendMessages: buildSendMessages(),
    openWindow: buildOpenWindow(),
    closeWindow: buildCloseWindow(),
    initPlugins: buildInitPlugins(),
    shareTargetPicker: buildShareTargetPicker(),
    scanCode: buildScanCode(),
    scanCodeV2: buildScanCodeV2(),
  }
}
