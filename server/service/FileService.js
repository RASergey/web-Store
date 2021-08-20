import * as uuid from 'uuid'
import * as path from 'path'
import fs from'fs'

class FileService {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)
            await file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e)
        }
    }

    async deleteFile(file) {
        try {
            const filePath = path.resolve('static', file)
            await fs.unlink(filePath, err => {
                if(err) throw err;
            })
        } catch (e) {
            return e
        }
    }
}

export default new FileService()