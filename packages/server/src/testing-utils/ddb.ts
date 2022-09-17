import {
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

export const refreshUsersTable = async ({
  ddbClient,
  tableName,
}: {
  ddbClient: DynamoDBClient
  tableName: string
}) => {
  const { TableNames: tableNames = [] } = await ddbClient.send(
    new ListTablesCommand({})
  )
  const foundTableName = tableNames.find((t) => t === tableName)
  await ddbClient.send(
    new DeleteTableCommand({
      TableName: foundTableName,
    })
  )
}
