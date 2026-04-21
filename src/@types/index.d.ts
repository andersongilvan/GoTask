import type { UserRole } from '@/enums/user-role'

declare global {
	namespace Express {
		export interface Request {
			user: {
				userId: string
				role: UserRole
			}
		}
	}
}
