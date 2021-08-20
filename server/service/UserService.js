import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import models from '../models/models.js'
import {validationResult} from 'express-validator'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class UserService {
    async registration(req, err) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return err(ApiError.badRequest(errors))
        }

        const {email, password, role} = req.body
        if (!email || !password) {
            return err(ApiError.badRequest('Некорректный email или password'))
        }

        const candidate = await models.User.findOne({where: {email}})
        if (candidate) {
            return err(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await models.User.create({email, role, password: hashPassword})

        //todo basket and reting
        // const basket = await models.Basket.create({userId: user.id})

        return generateJwt(user.id, user.email, user.role)
    }

    async login(userData, err) {
        const {email, password} = userData
        const user = await models.User.findOne({where: {email}})

        if (!user) {
            return err(ApiError.internal('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return err(ApiError.internal('Указан неверный пароль'))
        }
        return generateJwt(user.id, user.email, user.role)
    }

    async check(req) {
        return generateJwt(req.user.id, req.user.email, req.user.role)
    }

    async getAll() {
        return await models.User.findAll()
    }

    async delete({id}) {
        if (!id) {
            throw new Error('не указан ID')
        }

        await models.User.destroy({
            where: {
                id: id
            }
        })
    }
}
export default new UserService()