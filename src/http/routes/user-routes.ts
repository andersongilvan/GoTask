import { Router } from 'express'
import { authUserController } from '../controller/user/auth-user-controller'
import { createUserController } from '../controller/user/create-user-controller'
import { disableUserController } from '../controller/user/disable-user-controller'
import { findAllUsersController } from '../controller/user/find-all-users-controller'
import { findUserByIdController } from '../controller/user/find-user-by-id-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'

const userRoutes = Router()

// Rotas publicas
userRoutes.post('/', createUserController)
userRoutes.post('/auth', authUserController)

// Todas as rotas abaixo exigem um JWT valido.
userRoutes.use(ensureAuthentication)
userRoutes.get('/', findAllUsersController)
userRoutes.get('/:id', findUserByIdController)
userRoutes.put('/:id', disableUserController)

export { userRoutes }
