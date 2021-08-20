import {Router} from 'express'
import checkRole from '../middleware/checkAuthRoleMiddleware.js'
import RatingController from '../controllers/RatingController.js'

const router = new Router()

router.put('/', checkRole(), RatingController.update)
router.get('/ratings', checkRole(), RatingController.getDevicesUserMarked)
router.get('/', checkRole(), RatingController.get)

export default router