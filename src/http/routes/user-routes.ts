import { Router } from 'express'
import { UserRole } from '@/enums/user-role'
import { UserController } from '../controller/user/user-controller'
import { ensureAuthentication } from '../middlewares/ensure-authentication'
import { verifyAuthorization } from '../middlewares/verify-authorization'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/auth', userController.auth)

userRoutes.use(ensureAuthentication, verifyAuthorization([UserRole.ADMIN]))
userRoutes.post('/', userController.create)
userRoutes.get('/', userController.findAll)
userRoutes.get('/:id', userController.findById)
userRoutes.put('/:id/disable', userController.disable)
userRoutes.put('/:id/enable', userController.enable)

export { userRoutes }
