import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { makeCreateUserService } from '@/infra/factory/user/make-create-user-service'

export async function createUserController(request: Request, response: Response, next: NextFunction) {
	try {
		const bodySchema = z.object({
			name: z.string().min(3).max(20),
			email: z.string().email(),
			password: z.string().min(3).max(20),
		})

		const { name, email, password } = bodySchema.parse(request.body)

		const user = await makeCreateUserService().execute({ name, email, password })

		return response.status(201).json(user)
	} catch (error) {
		next(error)
	}
}
