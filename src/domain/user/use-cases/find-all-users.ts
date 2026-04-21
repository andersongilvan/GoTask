import type { UserOutput } from '@/domain/user/dto/user-output'
import type { UserRepository } from '@/domain/user/repositories/user-repository'

export class FindAllUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<UserOutput[]> {
		const userList = await this.userRepository.findAll()

		return userList.map((user) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			userRole: user.role,
			status: user.userStatus,
		}))
	}
}
