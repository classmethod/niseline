import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export class UserNotFoundError extends Error {}

export type FindUserByAccessTokenUseCase = (
  accessToken: string
) => Promise<User | UserNotFoundError>

export const buildFindUserByAccessTokenUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
  }): FindUserByAccessTokenUseCase =>
  async (accessToken: string) => {
    const user = await userRepository.findByAccessToken(accessToken)
    if (user == null) {
      return new UserNotFoundError()
    }

    return user
  }
