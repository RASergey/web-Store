import models from '../models/models.js'

class TypeService {
    async create(type) {
        const {name} = type
        return await models.Type.create({name})
    }

    async getAll() {
        return  await models.Type.findAll()
    }

    async delete({id}) {
        if (!id) {
            throw new Error('не указан ID')
        }

        await models.Type.destroy({
            where: {
                id: id
            }
        })
    }
}

export default new TypeService()