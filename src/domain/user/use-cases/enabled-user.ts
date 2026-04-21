import { ConflictError } from '@/domain/shared/errors/conflict-error'
import type { UserRepository } from '@/domain/user/repositories/user-repository'
import { UserStatus } from '@/enums/user-status'

export class EnabledUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string) {
		const user = await this.userRepository.findById(userId)
		const userEnabled = user?.userStatus === UserStatus.ENABLED

		if (userEnabled) {
			throw new ConflictError('Usuario ja esta ativado.')
		}

		await this.userRepository.enable(userId)
	}
}
