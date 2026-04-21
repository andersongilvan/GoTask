import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '@/domain/shared/errors/invalid-credentials-error'
import type { AuthUserInput } from '@/domain/user/dto/auth-user-input'
import type { UserRepository } from '@/domain/user/repositories/user-repository'
import { generateToken } from '@/utils/token-service'

export class AuthUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: AuthUserInput) {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		if (!(await compare(password, user.password))) {
			throw new InvalidCredentialsError()
		}

		return generateToken(user)
	}
}
