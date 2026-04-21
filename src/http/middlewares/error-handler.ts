import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AuthenticationError } from '@/domain/shared/errors/authentication-error'
import { ConflictError } from '@/domain/shared/errors/conflict-error'
import { ForbiddenError } from '@/domain/shared/errors/forbidden-error'
import { InvalidCredentialsError } from '@/domain/shared/errors/invalid-credentials-error'
import { NotFoundError } from '@/domain/shared/errors/not-found-error'

export function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
	if (error instanceof ZodError) {
		return response.status(400).json({
			message: 'Dados de entrada invalidos.',
			issues: error.flatten(),
		})
	}

	if (error instanceof AuthenticationError || error instanceof InvalidCredentialsError) {
		return response.status(401).json({ message: error.message })
	}

	if (error instanceof ForbiddenError) {
		return response.status(403).json({ message: error.message })
	}

	if (error instanceof NotFoundError) {
		return response.status(404).json({ message: error.message })
	}

	if (error instanceof ConflictError) {
		return response.status(409).json({ message: error.message })
	}

	console.log('error', error)

	return response.status(500).json({ message: 'Erro interno do servidor.' })
}
