import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { makeFindUserByIdService } from '@/infra/factory/user/make-find-user-by-id-service'

export async function findUserByIdController(request: Request, response: Response, next: NextFunction) {
	try {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const user = await makeFindUserByIdService().execute(id)

		return response.status(200).json(user)
	} catch (error) {
		next(error)
	}
}
