import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DynamoDBClient,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb'

export const buildLocalDdbClient = ({
  region,
  endpoint,
}: {
  region?: string
  endpoint?: string
}) =>
  new DynamoDBClient({
    region: region ?? 'ap-northeast-1',
    endpoint: endpoint ?? 'http://localhost:8000',
  })

export const buildChannelsTableDef = (
  tableName: string
): CreateTableCommandInput => ({
  TableName: tableName,
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
})

export const buildUsersTableDef = (
  tableName: string
): CreateTableCommandInput => ({
  TableName: tableName,
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
    {
      AttributeName: 'accessToken',
      AttributeType: 'S',
    },
    {
      AttributeName: 'idToken',
      AttributeType: 'S',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'accessTokenIndex',
      KeySchema: [
        {
          AttributeName: 'accessToken',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
    {
      IndexName: 'idTokenIndex',
      KeySchema: [
        {
          AttributeName: 'idToken',
          KeyType: 'HASH',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
})

export const refreshDdbTable = async ({
  ddbClient,
  tableName,
  tableDef,
}: {
  ddbClient: DynamoDBClient
  tableName: string
  tableDef: CreateTableCommandInput
}) => {
  const { TableNames: tableNames = [] } = await ddbClient.send(
    new ListTablesCommand({})
  )
  const foundTableName = tableNames.find((t) => t === tableName)
  if (foundTableName != null) {
    await ddbClient.send(
      new DeleteTableCommand({
        TableName: foundTableName,
      })
    )
  }

  await ddbClient.send(new CreateTableCommand(tableDef))
}
