import { User, UserId } from './user'

export interface UserRepository {
  findById: (id: UserId) => Promise<User | undefined>
}
