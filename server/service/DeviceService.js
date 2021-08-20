import models from '../models/models.js';
import fileService from './FileService.js'

class DeviceService {
    async create(deviceData, image) {
        const {name, price, brandId, typeId, info} = deviceData
        const {img} = image
        const fileName = await fileService.saveFile(img)
        const device = await models.Device.create({name, price, brandId, typeId, img: fileName})
        if (info) {
            JSON.parse(info).forEach(i => {
                models.DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            })
        }
        return device
    }

    async getAll(brandId, typeId, limit, page) {
        page = page || 1
        limit = limit || 20
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await models.Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await models.Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await models.Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await models.Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return devices
    }

    async getOne({id}) {
        return await models.Device.findOne(
            {
                where: {id},
                include: [{model: models.DeviceInfo, as: 'info'}]
            }
        )
    }

    async delete({id}) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const fileDelete = await models.Device.findOne(
            {
                where: {id}
            }
        )
        await models.DeviceInfo.destroy({
            where: {
                deviceId: id
            }
        })
        await models.Rating.destroy({
            where: {
                deviceId: id
            }
        })
        await fileService.deleteFile(fileDelete.img)
        await fileDelete.destroy()
    }
}

export default new DeviceService()