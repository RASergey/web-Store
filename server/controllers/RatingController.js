import ApiError from '../error/ApiError.js'
import RatingService from '../service/RatingService.js'

class RatingController {
    async update(req, res, next) {
        try {
            const device = await RatingService.update(req.user.id, req.body)
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getDevicesUserMarked(req, res, next) {
        try {
            const ratings = await RatingService.getDevicesUserMarked(req.user.id)
            return res.json({ratings})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const rating = await RatingService.get(req.user.id, req.query)
            return res.json({rating})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export default new RatingController()