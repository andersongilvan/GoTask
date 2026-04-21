import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { makeDisableUserService } from '@/infra/factory/user/make-disable-user-service'

export async function disableUserController(request: Request, response: Response, next: NextFunction) {
	try {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)
		await makeDisableUserService().execute(id)

		return response.status(204).send()
	} catch (error) {
		next(error)
	}
}
