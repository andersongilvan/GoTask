import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user'
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user'
import { DisableUserUseCase } from '@/domain/user/use-cases/disable-user'
import { EnabledUserUseCase } from '@/domain/user/use-cases/enabled-user'
import { FindAllUsersUseCase } from '@/domain/user/use-cases/find-all-users'
import { FindUserByIdUseCase } from '@/domain/user/use-cases/find-user-by-id'
import { UserRepositoryImpl } from '@/infra/repository-impl/user-repository-impl'

export class UserFactory {
	private readonly userRepository = new UserRepositoryImpl()

	makeAuthUserService() {
		return new AuthUserUseCase(this.userRepository)
	}

	makeCreateUserService() {
		return new CreateUserUseCase(this.userRepository)
	}

	makeDisableUserService() {
		return new DisableUserUseCase(this.userRepository)
	}

	makeFindAllUsersService() {
		return new FindAllUsersUseCase(this.userRepository)
	}

	makeFindUserByIdService() {
		return new FindUserByIdUseCase(this.userRepository)
	}

	makeEnabledUserService() {
		return new EnabledUserUseCase(this.userRepository)
	}
}
