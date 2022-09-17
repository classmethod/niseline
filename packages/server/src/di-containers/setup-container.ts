import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Container } from 'inversify'
import { UserDdbRepository } from '../repositories/user-ddb-repository'
import { ConsoleLogger } from '../utils/logger'
import * as serviceIds from './service-ids'

export const setupContainer = (): Container => {
  const container = new Container()
  container.bind(serviceIds.LOGGER).toDynamicValue(() => new ConsoleLogger())
  container
    .bind(serviceIds.USERS_TABLE_NAME)
    .toDynamicValue(() => process.env.USERS_TABLE_NAME!)
  container
    .bind(serviceIds.DDB_CLIENT)
    .toDynamicValue(() => new DynamoDBClient({}))
  container
    .bind(serviceIds.DDB_DOC_CLIENT)
    .toDynamicValue((context) =>
      DynamoDBDocumentClient.from(
        context.container.get<DynamoDBClient>(serviceIds.DDB_CLIENT)
      )
    )
  container
    .bind(serviceIds.USER_REPOSITORY)
    .toDynamicValue(
      (context) =>
        new UserDdbRepository({
          ddbDocClient: context.container.get<DynamoDBDocumentClient>(
            serviceIds.DDB_DOC_CLIENT
          ),
          usersTableName: context.container.get(serviceIds.USERS_TABLE_NAME),
        })
    )
    .inSingletonScope()
  return container
}