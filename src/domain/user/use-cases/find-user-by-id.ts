import { NotFoundError } from '@/domain/shared/errors/not-found-error'
import type { UserOutput } from '@/domain/user/dto/user-output'
import type { UserRepository } from '@/domain/user/repositories/user-repository'

export class FindUserByIdUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string): Promise<UserOutput> {
		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new NotFoundError('Usuario nao encontrado.')
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			userRole: user.role,
			status: user.userStatus,
		}
	}
}
