import { GenerateUuid } from '../../../util/uuid'
import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export class UserNotFoundError extends Error {}

export type LoginUseCase = (userId: string) => Promise<User | UserNotFoundError>

export const buildLoginUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
    generateUuid: GenerateUuid
  }): LoginUseCase =>
  async (userId: string) => {
    const user = await userRepository.find(userId)
    if (user == null) {
      return new UserNotFoundError()
    }

    await userRepository.save({ ...user })
    return user
  }
