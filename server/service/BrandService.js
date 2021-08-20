import models from '../models/models.js'

class BrandService {
    async create(brand) {
        const {name} = brand
        return await models.Brand.create({name})
    }

    async getAll() {
        return await models.Brand.findAll()
    }

    async delete({id}) {
        if (!id) {
            throw new Error('не указан ID')
        }

        await models.Brand.destroy({
            where: {
                id: id
            }
        })
    }
}

export default new BrandService()