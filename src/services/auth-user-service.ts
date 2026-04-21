import { compare } from 'bcryptjs'
import type { AuthUserReqequest } from '@/http/request/user/auth-user-request'
import { InvalidCredentialsError } from '@/infra/errors/invalid-credentials-error'
import type { UserRepository } from '@/repository/user-repository'
import { generateToken } from '@/utils/token-service'

export class AuthUserService {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: AuthUserReqequest) {
		// A autenticacao usa o par e-mail + senha.
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		if (!(await compare(password, user.password))) {
			throw new InvalidCredentialsError()
		}

		// Retorna um JWT para acesso as rotas protegidas.
		return generateToken(user)
	}
}
