# NiseLine

![NiseLine](https://github.com/cm-dyoshikawa/niseline/blob/main/niseline-logo.png)

NiseLine is inspired by [LocalStack](https://github.com/localstack/localstack). Goal of this tool is to create a mock service for [LINE](https://line.me/ja/).

## Getting Started

Launch NiseLine server by [Docker image](https://hub.docker.com/r/dyoshikawa/niseline).

```bash
docker run -d -p 3000:3000 dyoshikawa/niseline:latest
```

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
