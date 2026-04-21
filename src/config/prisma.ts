import { PrismaClient } from '@prisma/client'
import { env } from './env'

const prismaClient = new PrismaClient({
	log: env.NODE_ENV === 'developer' ? ['query', 'error'] : [],
})

export { prismaClient }
