import { User } from '../../domain/entity'
import {
  FindUserUseCase,
  UserNotFoundError as FindUserUseCaseUserNotFoundError,
} from '../../use-case/find-user-use-case'

export class UserNotFoundError extends Error {}

export type ShowUserComponentHandler = (
  id: string
) => Promise<User | UserNotFoundError>

export const buildShowUserComponentHandler =
  (findUserUseCase: FindUserUseCase): ShowUserComponentHandler =>
  async (id: string) => {
    const showUserResult = await findUserUseCase(id)

    if (showUserResult instanceof FindUserUseCaseUserNotFoundError) {
      return new UserNotFoundError()
    }

    return showUserResult
  }
