import type { Prisma, User } from '@prisma/client'

export interface UserRepository {
	save(data: Prisma.UserCreateInput): Promise<User>
	findByEmail(email: string): Promise<User | null>
	findById(userId: string): Promise<User | null>
	disable(userId: string): Promise<void>
	findAll(): Promise<User[]>
}
