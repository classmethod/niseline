import { User, UserId } from './user'

export interface UserRepository {
  save: (user: User) => Promise<void>
  findById: (id: UserId) => Promise<User | undefined>
  findByAccessToken: (accessToken: string) => Promise<User | undefined>
  findByIdToken: (idToken: string) => Promise<User | undefined>
}
