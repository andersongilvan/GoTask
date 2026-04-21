import type { NextFunction, Request, Response } from 'express'
import { makeFindAllUsersService } from '@/infra/factory/user/make-find-all-users-service'

export async function findAllUsersController(_request: Request, response: Response, next: NextFunction) {
	try {
		const users = await makeFindAllUsersService().execute()

		return response.status(200).json(users)
	} catch (error) {
		next(error)
	}
}
