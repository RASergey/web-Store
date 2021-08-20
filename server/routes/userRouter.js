import Router from 'express'
import userController from '../controllers/UserController.js'
import checkAuth from '../middleware/checkAuthRoleMiddleware.js'
import checkValidator from '../middleware/checkValidatorMiddleware.js'


const router = new Router()

router.post('/registration',checkValidator(), userController.registration)
router.post('/login', userController.login)
router.get('/auth', checkAuth(), userController.check)
router.get('/users', userController.getAll)
router.delete('/:id', userController.delete)

export default router