import ApiError from '../error/ApiError.js'
import typeService from '../service/TypeService.js';

class TypeController {
    async create(req, res, next) {
        try {
            const type = await typeService.create(req.body)
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const types = await typeService.getAll()
        return res.json(types)
    }

    async delete(req, res) {
        try {
            const device = await typeService.delete(req.params)
            return res.json(device)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new TypeController()