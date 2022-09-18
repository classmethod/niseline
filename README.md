# NiseLine

![NiseLine](https://github.com/cm-dyoshikawa/niseline/blob/main/niseline-logo.png)

NiseLine is inspired by [LocalStack](https://github.com/localstack/localstack). Goal of this tool is to create a mock service for [LINE](https://line.me/ja/).

## Getting Started

Launch NiseLine server by [Docker image](https://hub.docker.com/r/dyoshikawa/niseline).

```bash
docker run -d -p 3000:3000 dyoshikawa/niseline:latest
```

And install [NiseLiff SDK](https://www.npmjs.com/package/@niseline/niseliff).

```bash
npm i @niseline/niseliff
```

Use NiseLiff SDK in your client app!

```tsx
import { buildNiseliff } from '@niseline/niseliff'
import React from 'react'
import ReactDOM from 'react-dom'

const liff = buildNiseliff({
  liffId: 'DUMMY_LIFF_ID',
})

liff
  .init({
    liffId: 'DUMMY_LIFF_ID',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>Your client app</React.StrictMode>,
      document.getElementById('root')
    )
  })
```

## NiseLiff SDK

### Setup

Install [@niseline/niseliff](https://www.npmjs.com/package/@niseline/niseliff).

```bash
npm i @niseline/niseliff
```

### Usage

#### With npm package of LIFF SDK

You can use with [npm package of LIFF SDK](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#use-npm-package). Switch between the real LIFF SDK and the NiseLiff SDK for each environment. In this example, the NiseLiff SDK is used only in the local environment.

```ts
// /path/to/config.ts

export const env: 'local' | 'development' | 'staging' | 'production' = 'local'
```

```ts
// /path/to/liff.ts

import * as config from '/path/to/config'
import realLiff, { Liff } from '@line/liff'
import { buildNiseliff } from '@niseline/niseliff'

const liff =
  config.env === 'local' ? buildNiseliff({ liffId: 'DUMMY_LIFF_ID' }) : realLiff
export default liff
```

```tsx
// /path/to/index.tsx

import liff from '/path/to/liff'
import React from 'react'
import ReactDOM from 'react-dom'

liff.init({ liffId: 'DUMMY_LIFF_ID' }).then(() => {
  ReactDOM.render(
    <React.StrictMode>Your client app</React.StrictMode>,
    document.getElementById('root')
  )
})
```

#### With CDN of LIFF SDK

You can also use with [CDN of LIFF SDK](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#specify-cdn-path). If you use typescript, it is recommended that you install the @line/liff package. The actual runtime is a CDN, but the type definitions are available from the npm package.

```ts
// /path/to/config.ts

export const env: 'local' | 'development' | 'staging' | 'production' = 'local'
```

```tsx
// /path/to/index.tsx

import * as config from '/path/to/config'
import { Liff } from '@line/liff'
import { buildNiseliff } from '@niseline/niseliff'
import React from 'react'
import ReactDOM from 'react-dom'

declare global {
  var liff: Liff
}

if (config.env === 'local') {
  window.liff = buildNiseliff({
    liffId: 'DUMMY_LIFF_ID',
  })
}

window.liff
  .init({
    liffId: 'DUMMY_LIFF_ID',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>Your client app</React.StrictMode>,
      document.getElementById('root')
    )
  })
```

### Features

- [ ] [Ready](https://developers.line.biz/ja/reference/liff/#ready)
- [ ] [Id](https://developers.line.biz/ja/reference/liff/#id)
- [ ] [Initialize liff app](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)
- [ ] [Get os](https://developers.line.biz/ja/reference/liff/#get-os)
- [ ] [Get language](https://developers.line.biz/ja/reference/liff/#get-language)
- [ ] [Get version](https://developers.line.biz/ja/reference/liff/#get-version)
- [ ] [Get line version](https://developers.line.biz/ja/reference/liff/#get-line-version)
- [ ] [Is in client](https://developers.line.biz/ja/reference/liff/#is-in-client)
- [ ] [Is logged in](https://developers.line.biz/ja/reference/liff/#is-logged-in)
- [ ] [Is api available](https://developers.line.biz/ja/reference/liff/#is-api-available)
- [ ] [Login](https://developers.line.biz/ja/reference/liff/#login)
- [ ] [Logout](https://developers.line.biz/ja/reference/liff/#logout)
- [ ] [Get access token](https://developers.line.biz/ja/reference/liff/#get-access-token)
- [ ] [Get ID token](https://developers.line.biz/ja/reference/liff/#get-id-token)
- [ ] [Get decoded ID token](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)
- [ ] [Get context](https://developers.line.biz/ja/reference/liff/#get-context)
- [ ] [Get profile](https://developers.line.biz/ja/reference/liff/#get-profile)
- [ ] [Get friendship](https://developers.line.biz/ja/reference/liff/#get-friendship)
- [ ] [Permission query](https://developers.line.biz/ja/reference/liff/#permission-query)
- [ ] [Permission request all](https://developers.line.biz/ja/reference/liff/#permission-request-all)
- [ ] [Permanent link create url by](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)
- [ ] [Permanent link create url](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)
- [ ] [Permanent link set extra query param](https://developers.line.biz/ja/reference/liff/#permanent-linke-set-extra-query-param)
- [ ] [Send messages](https://developers.line.biz/ja/reference/liff/#send-messages)
- [ ] [Open window](https://developers.line.biz/ja/reference/liff/#open-window)
- [ ] [Share target picker](https://developers.line.biz/ja/reference/liff/#share-target-picker)
- [ ] [Scan code v2](https://developers.line.biz/ja/reference/liff/#scan-code-v2)
- [ ] [Scan code](https://developers.line.biz/ja/reference/liff/#scan-code)
- [ ] [Close window](https://developers.line.biz/ja/reference/liff/#close-window)
- [ ] [Init plugins](https://developers.line.biz/ja/reference/liff/#init-plugins)
- [ ] [Bluetooth get availability](https://developers.line.biz/ja/reference/liff/#bluetooth-get-availability)
- [ ] [Bluetooth request device](https://developers.line.biz/ja/reference/liff/#bluetooth-request-device)
- [ ] [Bluetooth referring device](https://developers.line.biz/ja/reference/liff/#bluetooth-referring-device)

## NiseLine Server

### Setup

Pull and run [dyoshikawa/niseline](https://hub.docker.com/r/dyoshikawa/niseline).

#### Docker

```bash
docker run -d -p 3000:3000 dyoshikawa/niseline:latest
curl http://localhost:3000/niseline/api/ping
# => {"ping":"pong"}
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3'
services:
  niseline:
    image: dyoshikawa/niseline:latest
    ports:
      - 3000:3000
```

```bash
docker compose up -d
curl http://localhost:3000/niseline/api/ping
# => {"ping":"pong"}
```

### Usage

```bash
curl --request POST \
  --url http://localhost:3000/niseline/api/users \
  --header 'content-type: application/json' \
  --data '{"id": "FOO_ID","name": "Foo","picture": "http://example.com/foo.jpg","email": "foo@example.com"}'
# => null

curl -v -X POST 'http://localhost:3000/oauth2/v2.1/verify' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'id_token=FOO_ID' \
  --data-urlencode 'client_id=1234567890'
# => {"iss":"https://example.com","sub":"FOO_ID","aud":"1234567890","exp":1504169092,"iat":1504263657,"nonce":"0987654asdf","amr":["pwd"],"name":"Foo","picture":"http://example.com/foo.jpg","email":"foo@example.com"}
```

### Features

#### NiseLine Original API

- [x] Ping
- [x] Save channel
- [ ] Delete channel
- [x] Save user
- [ ] Delete user

#### Login API

- [ ] [Issue access token](https://developers.line.biz/ja/reference/line-login/#issue-access-token)
- [x] [Verify access token](https://developers.line.biz/ja/reference/line-login/#verify-access-token)
- [ ] [Refresh access token](https://developers.line.biz/ja/reference/line-login/#refresh-access-token)
- [ ] [Revoke access token](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)
- [x] [Verify ID token](https://developers.line.biz/ja/reference/line-login/#verify-id-token)
- [ ] [Get user profile](https://developers.line.biz/ja/reference/line-login/#get-user-profile)
- [ ] [Get friendship status](https://developers.line.biz/ja/reference/line-login/#get-friendship-status)

#### Messaging API

- [ ] [Send reply message](https://developers.line.biz/ja/reference/messaging-api/#send-reply-message)
- [ ] [Send push message](https://developers.line.biz/ja/reference/messaging-api/#send-push-message)
- [ ] [Send multicast message](https://developers.line.biz/ja/reference/messaging-api/#send-multicast-message)
- [ ] [Send narrowcast message](https://developers.line.biz/ja/reference/messaging-api/#send-narrowcast-message)
- [ ] [Get narrowcast progress status](https://developers.line.biz/ja/reference/messaging-api/#get-narrowcast-progress-status)
- [ ] [Send broadcast message](https://developers.line.biz/ja/reference/messaging-api/#send-broadcast-message)
- [ ] [Get content](https://developers.line.biz/ja/reference/messaging-api/#get-content)
- [ ] [Get quota](https://developers.line.biz/ja/reference/messaging-api/#get-quota)
- [ ] [Get consumption](https://developers.line.biz/ja/reference/messaging-api/#get-consumption)
- [ ] [Get number of reply messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-reply-messages)
- [ ] [Get number of push messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-push-messages)
- [ ] [Get number of multicast messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-multicast-messages)
- [ ] [Get number of broadcast messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-broadcast-messages)
- [ ] [Retry api request](https://developers.line.biz/ja/reference/messaging-api/#retry-api-request)
