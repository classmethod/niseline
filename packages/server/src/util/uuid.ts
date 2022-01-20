import { v4 as uuidV4 } from 'uuid'

export type GenerateUuid = () => string

export const buildGenerateUuid = (): GenerateUuid => () => uuidV4()
