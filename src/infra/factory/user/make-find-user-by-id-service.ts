import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'
import { FindUserByIdService } from '@/services/find-user-by-id-service'

export function makeFindUserByIdService() {
	const userRepository = new UserRepositoryImpl()

	const findUserByIdService = new FindUserByIdService(userRepository)

	return findUserByIdService
}
