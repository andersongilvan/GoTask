import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { UserRole } from '@/enums/user-role'
import { UserStatus } from '@/enums/user-status'
import { UserFactory } from '@/infra/factory/user/user-factory'

export class UserController {
	private readonly userFactory = new UserFactory()

	auth = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bodySchema = z.object({
				email: z.string().email(),
				password: z.string(),
			})

			const { email, password } = bodySchema.parse(request.body)
			const token = await this.userFactory.makeAuthUserService().execute({ email, password })

			return response.status(200).json({ token })
		} catch (error) {
			next(error)
		}
	}

	create = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const bodySchema = z.object({
				name: z.string().min(3).max(20),
				email: z.string().email(),
				password: z.string().min(3).max(20),
				role: z.nativeEnum(UserRole),
		
			})

			const { name, email, password, role } = bodySchema.parse(request.body)
			const user = await this.userFactory.makeCreateUserService().execute({ name, email, password, role })

			return response.status(201).json(user)
		} catch (error) {
			next(error)
		}
	}

	findAll = async (_request: Request, response: Response, next: NextFunction) => {
		try {
			const users = await this.userFactory.makeFindAllUsersService().execute()
			return response.status(200).json(users)
		} catch (error) {
			next(error)
		}
	}

	findById = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)
			const user = await this.userFactory.makeFindUserByIdService().execute(id)

			return response.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	disable = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)
			await this.userFactory.makeDisableUserService().execute(id)

			return response.status(204).send()
		} catch (error) {
			next(error)
		}
	}

	enable = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)
			await this.userFactory.makeEnabledUserService().execute(id)

			return response.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}
