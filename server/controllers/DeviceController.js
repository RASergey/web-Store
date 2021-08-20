import ApiError from '../error/ApiError.js';
import deviceService from '../service/DeviceService.js';

class DeviceController {
    async create(req, res, next) {
        try {
            const device =await deviceService.create(req.body, req.files)
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const {brandId, typeId, limit, page} = req.query
        const ratingsDevice = await deviceService.getAll(brandId, typeId, limit, page)
        return res.json(ratingsDevice)
    }

    async getOne(req, res) {
        try {
            const device = await deviceService.getOne(req.params)
            return res.json(device)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const device = await deviceService.delete(req.params)
            return res.json(device)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new DeviceController()