import type { UserResponse } from '@/http/response/user/user-response'
import type { UserRepository } from '@/repository/user-repository'

export class FindAllUsersService {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<UserResponse[]> {
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
