import type { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { env } from '@/config/env'

export function generateToken(user: User) {
	// "role" vai no payload para validacoes de autorizacao.
	const token = sign({ role: user.role }, env.JWT_SECRET, {
		// "sub" guarda o id do usuario como claim padrao do JWT.
		subject: user.id,
		expiresIn: env.EXPIRES_IN,
	})

	return token
}
