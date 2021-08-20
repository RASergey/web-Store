import ApiError from '../error/ApiError.js'
import userService from '../service/UserService.js';

class UserController {
    async registration(req, res, next) {
        try {
            const token = await userService.registration(req, next)
            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const token = await userService.login(req.body, next)
            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = await userService.check(req)
            res.json({token})
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        const users = await userService.getAll()
        return res.json(users)
    }

    async delete(req, res) {
        try {
            const user = await userService.delete(req.params)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new UserController()