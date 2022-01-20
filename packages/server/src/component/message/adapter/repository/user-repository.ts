import {
  ShowUserComponentHandler,
  UserNotFoundError,
} from '../../../user/adapter/handler/find-user-component-handler'
import { User } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'

export class UserComponentRepository implements UserRepository {
  private readonly findUserComponentHandler: ShowUserComponentHandler

  constructor({
    findUserComponentHandler,
  }: {
    findUserComponentHandler: ShowUserComponentHandler
  }) {
    this.findUserComponentHandler = findUserComponentHandler
  }

  async findUser(id: string): Promise<User | undefined> {
    const showUserResult = await this.findUserComponentHandler(id)

    if (showUserResult instanceof UserNotFoundError) {
      return undefined
    }

    return showUserResult
  }
}
