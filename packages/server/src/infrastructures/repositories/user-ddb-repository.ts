import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb'
import { User, UserId } from '../../models/user/user'
import { UserRepository } from '../../models/user/user-repository'
import { UserDdbItem, userDdbItemSchema } from '../ddb-item-schemas'

const userDdbItemToUser = (userDdbItem: UserDdbItem): User => {
  const [channelId, id] = userDdbItem.channelUserId.split('#')
  return {
    id,
    accessToken: userDdbItem.accessToken,
    idToken: userDdbItem.idToken,
    email: userDdbItem.email,
    name: userDdbItem.name,
    picture: userDdbItem.picture,
    channelId,
  }
}

const userDdbItemFromUser = (user: User): UserDdbItem => ({
  channelUserId: [user.channelId, user.id].join('#'),
  accessToken: user.accessToken,
  idToken: user.idToken,
  email: user.email,
  name: user.name,
  picture: user.picture,
  channelId: user.channelId,
})

export class UserDdbRepository implements UserRepository {
  private readonly ddbDocClient: DynamoDBDocumentClient

  private readonly usersTableName: string

  private readonly accessTokenIndexName = 'accessTokenIndex'

  private readonly idTokenIndexName = 'idTokenIndex'

  constructor({
    ddbDocClient,
    usersTableName,
  }: {
    ddbDocClient: DynamoDBDocumentClient
    usersTableName: string
  }) {
    this.ddbDocClient = ddbDocClient
    this.usersTableName = usersTableName
  }

  async save(user: User): Promise<void> {
    await this.ddbDocClient.send(
      new PutCommand({
        TableName: this.usersTableName,
        Item: userDdbItemSchema.parse(userDdbItemFromUser(user)),
      })
    )
  }

  async findById(id: UserId): Promise<User | undefined> {
    const { Item: userDdbItem } = await this.ddbDocClient.send(
      new GetCommand({
        TableName: this.usersTableName,
        Key: {
          id,
        },
      })
    )

    if (userDdbItem == null) {
      return undefined
    }

    const user = userDdbItemToUser(userDdbItemSchema.parse(userDdbItem))
    return user
  }

  async findByAccessToken(accessToken: string): Promise<User | undefined> {
    const { Items: userDdbItems = [] } = await this.ddbDocClient.send(
      new QueryCommand({
        TableName: this.usersTableName,
        IndexName: this.accessTokenIndexName,
        KeyConditionExpression: '#accessToken = :accessToken',
        ExpressionAttributeNames: {
          '#accessToken': 'accessToken',
        },
        ExpressionAttributeValues: {
          ':accessToken': accessToken,
        },
      })
    )

    const users = userDdbItems
      .map((userDdbItem) => userDdbItemSchema.parse(userDdbItem))
      .map(userDdbItemToUser)

    if (users.length > 1) {
      throw new Error(`Should 0 or only 1 users. users.length=${users.length}`)
    }

    if (users.length === 0) {
      return undefined
    }

    return users[0]
  }

  async findByIdToken(idToken: string): Promise<User | undefined> {
    const { Items: userDdbItems = [] } = await this.ddbDocClient.send(
      new QueryCommand({
        TableName: this.usersTableName,
        IndexName: this.idTokenIndexName,
        KeyConditionExpression: '#idToken = :idToken',
        ExpressionAttributeNames: {
          '#idToken': 'idToken',
        },
        ExpressionAttributeValues: {
          ':idToken': idToken,
        },
      })
    )

    const users = userDdbItems
      .map((userDdbItem) => userDdbItemSchema.parse(userDdbItem))
      .map(userDdbItemToUser)

    if (users.length > 1) {
      throw new Error(`Should 0 or only 1 users. users.length=${users.length}`)
    }

    if (users.length === 0) {
      return undefined
    }

    return users[0]
  }
}
