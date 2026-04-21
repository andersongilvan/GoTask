import type { UserRole } from '@/enums/user-role'


export type CreateUserInput = {
	name: string
	email: string
	password: string
	role: UserRole
}
