import { ConflictError } from '@/infra/errors/conflicit-error'
import type { UserRepository } from '@/repository/user-repository'

export class DisableUserService {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string) {
		const user = await this.userRepository.findById(userId)

		const userDisabled = user?.userStatus === 'DISABLED'

		if (userDisabled) {
			throw new ConflictError('Usuario ja esta desativado.')
		}

		await this.userRepository.disable(userId)
	}
}
