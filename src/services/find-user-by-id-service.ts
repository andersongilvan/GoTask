import type { UserResponse } from '@/http/response/user/user-response'
import { DataNotFound } from '@/infra/errors/data-not-found-error'
import type { UserRepository } from '@/repository/user-repository'

export class FindUserByIdService {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: string): Promise<UserResponse> {
		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new DataNotFound('Usuario nao encontrado.')
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
