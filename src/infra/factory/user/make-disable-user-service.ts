import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'
import { DisableUserService } from '@/services/disable-user-service'

export function makeDisableUserService() {
	const userRepository = new UserRepositoryImpl()

	const disableUserService = new DisableUserService(userRepository)

	return disableUserService
}
