import models from '../models/models.js'

class RatingService {
    async update(userId, {rate, deviceId}) {
        await models.Rating.destroy({
            where: {
                userId: userId,
                deviceId: deviceId
            }
        })
        await models.Rating.create({rate, userId, deviceId})

        const ratingsDevice = await models.Rating.findAndCountAll({
            where: {
                deviceId: deviceId
            }
        })

        let allRateDevice = ratingsDevice.rows
            .map(item => item.rate)
            .reduce((acc, item) => {
                for (const assKey in acc) {
                    if (+assKey === item) {
                        ++acc[assKey]
                    }
                }
                return acc
            }, {5: 0, 4: 0, 3: 0, 2: 0, 1: 0})

        let rating = Object.keys(allRateDevice).reduce((acc, item) => {
            acc += item * allRateDevice[item]
            return acc
        }, 0) / ratingsDevice.count

        rating = Math.round(rating * 10) / 10

        await models.Device.update(
            {
                rating: rating
            },
            {
                where: {
                    id: deviceId
                }
            }
        )

        return rate
    }

    async getDevicesUserMarked(userId) {
        const rating = await models.Rating.findAll({
            where: {
                userId: userId
            }
        })
        if (rating === null) {
            return 0
        }
        return rating.map(item => item.deviceId)
    }

    async get(userId, {deviceId}) {
        const rating = await models.Rating.findOne({
            where: {
                userId: userId,
                deviceId: deviceId
            }
        })
        if (rating === null) {
            return 0
        }
        return rating.rate
    }
}

export default new RatingService()