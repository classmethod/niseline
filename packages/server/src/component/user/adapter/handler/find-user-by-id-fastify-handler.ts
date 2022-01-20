import { RouteHandlerMethod } from 'fastify'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildFindUserByIdFastifyHandler =
  ({
    findUserUseCase,
  }: {
    findUserUseCase: FindUserUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const { id } = request.params as { id: string }
    const user = await findUserUseCase(id)
    if (user instanceof UserNotFoundError) {
      reply.type('application/json').code(401).send()
      return
    }

    reply.type('application/json').code(200).send(user)
  }
