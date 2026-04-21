import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { makeAuthUserService } from '@/infra/factory/user/make-auth-user-service'

export async function authUserController(request: Request, response: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			email: z.string().email(),
			password: z.string(),
		})

		const { email, password } = bodySchema.parse(request.body)

		const token = await makeAuthUserService().execute({ email, password })

		return response.status(200).json({ token })
	} catch (error) {
		next(error)
	}
}
