import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '@/config/env'
import { AuthenticationError } from '@/domain/shared/errors/authentication-error'
import type { UserRole } from '@/enums/user-role'

type TokenPayload = {
	sub: string
	role: UserRole
}

export function ensureAuthentication(request: Request, _response: Response, next: NextFunction) {
	// Formato esperado do header: "Bearer <token>".
	const authHeader = request.headers.authorization

	if (!authHeader) {
		throw new AuthenticationError('Token nao informado.')
	}

	try {
		const [, token] = authHeader.split(' ')

		// O subject (sub) do token representa o id do usuario autenticado.
		const { role, sub: userId } = verify(token, env.JWT_SECRET) as TokenPayload

		// Anexa os dados do usuario autenticado no ciclo da requisicao.
		request.user = {
			role,
			userId,
		}

		return next()
	} catch {
		throw new AuthenticationError('Token invalido.')
	}
}
