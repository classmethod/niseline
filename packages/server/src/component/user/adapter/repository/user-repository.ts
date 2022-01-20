import { JSONFile, Low } from 'lowdb'
import { User } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'

export type UserRecord = User

export type UserJson = ReadonlyArray<UserRecord>

export class UserLowRepository implements UserRepository {
  private readonly low: Low<UserJson>

  constructor() {
    const file = './tmp/users.json'
    const adapter = new JSONFile<UserJson>(file)
    this.low = new Low(adapter)
  }

  async find(id: string): Promise<User | undefined> {
    await this.low.read()
    const userRecord: UserRecord | undefined = this.low.data?.find(
      (r) => r.id === id
    )
    if (userRecord == null) {
      return undefined
    }

    return userRecord
  }

  async findByAccessToken(accessToken: string): Promise<User | undefined> {
    await this.low.read()
    const userRecord: UserRecord | undefined = this.low.data?.find(
      (r) => r.accessToken === accessToken
    )
    if (userRecord == null) {
      return undefined
    }

    return userRecord
  }

  async findByIdToken(idToken: string): Promise<User | undefined> {
    await this.low.read()
    const userRecord: UserRecord | undefined = this.low.data?.find(
      (r) => r.idToken === idToken
    )
    if (userRecord == null) {
      return undefined
    }

    return userRecord
  }

  async save(user: User): Promise<void> {
    await this.low.read()
    this.low.data = this.low.data!.concat(user)
    await this.low.write()
  }
}
