import Router from 'express'
import typeController from '../controllers/TypeController.js'
import checkRole from '../middleware/checkAuthRoleMiddleware.js'

const router = new Router()

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/',typeController.getAll)
router.delete('/delete/:id', typeController.delete)

export default router