import 'source-map-support/register'
import * as serviceIds from './di-containers/service-ids'
import { setupContainer } from './di-containers/setup-container'
import { buildApp } from './handlers/app'
import {
  buildChannelsTableDef,
  buildLocalDdbClient,
  buildUsersTableDef,
  refreshDdbTable,
} from './testing-utils/ddb'

const main = async () => {
  const ddbClient = buildLocalDdbClient({})
  const container = setupContainer({ ddbClient })
  await refreshDdbTable({
    ddbClient,
    tableName: container.get<string>(serviceIds.CHANNELS_TABLE_NAME),
    tableDef: buildChannelsTableDef(
      container.get<string>(serviceIds.CHANNELS_TABLE_NAME)
    ),
  })
  await refreshDdbTable({
    ddbClient,
    tableName: container.get<string>(serviceIds.USERS_TABLE_NAME),
    tableDef: buildUsersTableDef(
      container.get<string>(serviceIds.USERS_TABLE_NAME)
    ),
  })

  const app = buildApp({ container })

  const port = process.env.PORT ?? '3000'

  app.listen(Number(port), '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('start')
  })
}

main()
