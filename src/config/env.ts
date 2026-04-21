import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['developer', 'production']).default('developer'),
	JWT_SECRET: z.coerce.string(),
	EXPIRES_IN: z.coerce.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Variaveis de ambiente invalidas', _env.error.format())
	throw new Error('Variaveis de ambiente invalidas')
}

export const env = _env.data
