import Router from 'express'
import brandController from '../controllers/BrandController.js'
import checkRole from '../middleware/checkAuthRoleMiddleware.js'

const router = new Router()

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/delete/:id', brandController.delete)

export default router