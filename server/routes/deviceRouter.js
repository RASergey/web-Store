import Router from 'express'
import deviceController from '../controllers/DeviceController.js'
import checkRole from '../middleware/checkAuthRoleMiddleware.js';

const router = new Router()

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', deviceController.delete)

export default router