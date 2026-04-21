import type { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '@/domain/shared/errors/forbidden-error'
import type { UserRole } from '@/enums/user-role'

export function verifyAuthorization(allowedRoles: UserRole[]) {
	return (request: Request, _response: Response, next: NextFunction) => {
		const { role } = request.user

		if (!allowedRoles.includes(role)) {
			throw new ForbiddenError('Usuario nao autorizado.')
		}

		next()
	}
}
