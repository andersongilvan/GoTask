import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'
import { CreateUserService } from '@/services/create-user-service'

export function makeCreateUserService() {
	const userRepository = new UserRepositoryImpl()

	const createUserService = new CreateUserService(userRepository)

	return createUserService
}
