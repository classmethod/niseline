import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export class UserNotFoundError extends Error {}

export type FindUserByAccessTokenUseCase = (
  idToken: string
) => Promise<User | UserNotFoundError>

export const buildFindUserByIdTokenUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
  }): FindUserByAccessTokenUseCase =>
  async (idToken: string) => {
    const user = await userRepository.findByIdToken(idToken)
    if (user == null) {
      return new UserNotFoundError()
    }

    return user
  }
