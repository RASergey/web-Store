import ApiError from '../error/ApiError.js'
import brandService from '../service/BrandService.js'

class BrandController {
    async create(req, res, next) {
        try {
            const brand = await brandService.create(req.body)
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const brands = await brandService.getAll()
        return res.json(brands)
    }

    async delete(req, res) {
        try {
            const device = await brandService.delete(req.params)
            return res.json(device)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new BrandController()