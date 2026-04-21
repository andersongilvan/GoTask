import type { UserRole, UserStatus } from '@prisma/client'

export type UserResponse = {
	id: string
	name: string
	email: string
	userRole: UserRole
	status: UserStatus
}
