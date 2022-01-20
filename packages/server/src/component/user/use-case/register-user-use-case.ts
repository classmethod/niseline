import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export type RegisterUserUseCase = (user: User) => Promise<void | Error>

export const buildRegisterUserUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
  }): RegisterUserUseCase =>
  async (user: User) => {
    await userRepository.save(user)
  }
