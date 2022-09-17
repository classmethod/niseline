import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { User, UserId } from '../models/user/user'
import { UserRepository } from '../models/user/user-repository'
import { UserDdbItem, userDdbItemSchema } from './ddb-item-schemas'

const userDdbItemToUser = (userDdbItem: UserDdbItem): User => ({
  id: userDdbItem.pk.split('#')[1],
})

export class UserDdbRepository implements UserRepository {
  private readonly ddbDocClient: DynamoDBDocumentClient

  private readonly usersTableName: string

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
}
