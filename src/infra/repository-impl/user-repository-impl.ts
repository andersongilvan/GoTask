import type { Prisma, User } from '@prisma/client'
import { prismaClient } from '@/config/prisma'
import type { UserRepository } from '@/repository/user-repository'

export class UserRepositoryImpl implements UserRepository {
	async findAll(): Promise<User[]> {
		return await prismaClient.user.findMany()
	}

	async save(data: Prisma.UserCreateInput): Promise<User> {
		return await prismaClient.user.create({
			data,
		})
	}

	async findByEmail(email: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: { email },
		})
	}

	async findById(userId: string): Promise<User | null> {
		return await prismaClient.user.findFirst({
			where: { id: userId },
		})
	}

	async disable(userId: string): Promise<void> {
		await prismaClient.user.update({
			where: { id: userId },
			data: { userStatus: 'DISABLED' },
		})
	}
}
