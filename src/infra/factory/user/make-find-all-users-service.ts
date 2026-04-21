import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'
import { FindAllUsersService } from '@/services/find-all-users-service'

export function makeFindAllUsersService() {
	const userRepository = new UserRepositoryImpl()

	const findAllUsersService = new FindAllUsersService(userRepository)

	return findAllUsersService
}
