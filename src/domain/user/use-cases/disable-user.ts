import { ConflictError } from '@/domain/shared/errors/conflict-error'
import type { UserRepository } from '@/domain/user/repositories/user-repository'
import { UserStatus } from '@/enums/user-status'

export class DisableUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string) {
		const user = await this.userRepository.findById(userId)
		const userDisabled = user?.userStatus === UserStatus.DISABLED

		if (userDisabled) {
			throw new ConflictError('Usuario ja esta desativado.')
		}

		await this.userRepository.disable(userId)
	}
}
