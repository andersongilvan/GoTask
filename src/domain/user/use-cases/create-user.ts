import { hash } from 'bcryptjs'
import { ConflictError } from '@/domain/shared/errors/conflict-error'
import type { CreateUserInput } from '@/domain/user/dto/create-user-input'
import type { UserOutput } from '@/domain/user/dto/user-output'
import type { UserRepository } from '@/domain/user/repositories/user-repository'

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ name, email, password, role }: CreateUserInput): Promise<UserOutput> {
		const userWithEmailDuplicated = await this.userRepository.findByEmail(email)

		if (userWithEmailDuplicated) {
			throw new ConflictError('E-mail ja cadastrado.')
		}

		const hashPassword = await hash(password, 6)

		const userCreated = await this.userRepository.save({
			name,
			email,
			password: hashPassword,
			role,
		})

		return {
			id: userCreated.id,
			name: userCreated.name,
			email: userCreated.email,
			role: userCreated.role,
			status: userCreated.userStatus,
		}
	}
}
