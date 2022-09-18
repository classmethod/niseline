import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb'
import { Channel } from '../../models/channel/channel'
import { ChannelRepository } from '../../models/channel/channel-repository'
import { ChannelDdbItem, channelDdbItemSchema } from '../ddb-item-schemas'

const channelDdbItemToChannel = (channel: ChannelDdbItem): Channel => ({
  id: channel.id,
})

const channelDdbItemFromChannel = (channel: Channel): ChannelDdbItem => ({
  id: channel.id,
})

export class ChannelDdbRepository implements ChannelRepository {
  private readonly ddbDocClient: DynamoDBDocumentClient

  private readonly channelsTableName: string

  constructor({
    ddbDocClient,
    channelsTableName,
  }: {
    ddbDocClient: DynamoDBDocumentClient
    channelsTableName: string
  }) {
    this.ddbDocClient = ddbDocClient
    this.channelsTableName = channelsTableName
  }

  async save(channel: Channel): Promise<void> {
    const item = channelDdbItemSchema.parse(channelDdbItemFromChannel(channel))
    this.ddbDocClient.send(
      new PutCommand({
        TableName: this.channelsTableName,
        Item: item,
      })
    )
  }

  async findById(id: string): Promise<Channel | undefined> {
    const { Item: item } = await this.ddbDocClient.send(
      new GetCommand({
        TableName: this.channelsTableName,
        Key: {
          id,
        },
      })
    )

    if (item == null) {
      return undefined
    }

    return channelDdbItemToChannel(channelDdbItemSchema.parse(item))
  }
}
