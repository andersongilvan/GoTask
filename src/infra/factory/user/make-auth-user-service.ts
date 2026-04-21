import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'
import { AuthUserService } from '@/services/auth-user-service'

export function makeAuthUserService() {
	const userRepository = new UserRepositoryImpl()

	const authUserService = new AuthUserService(userRepository)

	return authUserService
}
