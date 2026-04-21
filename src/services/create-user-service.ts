import { hash } from 'bcryptjs'
import type { CreateUserRquest } from '@/http/request/user/create-user-request'
import type { UserResponse } from '@/http/response/user/user-response'
import { ConflictError } from '@/infra/errors/conflicit-error'
import type { UserRepository } from '@/repository/user-repository'

export class CreateUserService {
	constructor(private userRepository: UserRepository) {}

	async execute({ name, email, password }: CreateUserRquest): Promise<UserResponse> {
		// Evita criar contas duplicadas por e-mail.
		const userWithEmailDuplicated = await this.userRepository.findByEmail(email)

		if (userWithEmailDuplicated) {
			throw new ConflictError('E-mail ja cadastrado.')
		}

		// Persiste apenas o hash da senha, nunca a senha em texto puro.
		const hashPassword = await hash(password, 6)

		const userCreated = await this.userRepository.save({
			name,
			email,
			password: hashPassword,
		})

		return {
			id: userCreated.id,
			name: userCreated.name,
			email: userCreated.email,
			userRole: userCreated.role,
			status: userCreated.userStatus,
		}
	}
}
