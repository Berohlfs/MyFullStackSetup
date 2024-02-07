// Libs
import { Request, Response } from 'express'
import sharp from 'sharp'
import { resolve } from 'path'
import fs from 'fs'
// Scripts
import { responseMessage } from '../utils/general'
import { generateUniqueFileName } from '../utils/general'
import { ftpClient } from '../helpers/ftpClient'

class ImagensController {
    async create(req: Request, res: Response) {

        const temp_file_name = generateUniqueFileName()

        try {
            await sharp(req.file?.buffer)
                .webp()
                .rotate()
                .resize(1000)
                .toFile(resolve(__dirname, '..', 'temp', temp_file_name))

            const client = await ftpClient

            await client.uploadFrom(resolve(__dirname, '..', 'temp', temp_file_name), temp_file_name + '.webp')

            return res.status(200).json(responseMessage('Upload de imagem realizado com sucesso.'))
        } catch (error) {
            if(error instanceof Error){
                if(error.message.includes('unsupported image format')){
                    return res.status(400).json(responseMessage('Tipo de arquivo não suportado.'))
                }
                return res.status(500).json(responseMessage('Erro interno de servidor.', error))
            }
            console.log(error)
            return res.status(500).json(responseMessage('Erro interno de servidor.', error))
        } finally {
            fs.unlink(resolve(__dirname, '..', 'temp', temp_file_name), (error) => {
                if (error) {
                    console.log('Failed to delete temp file.')
                } else {
                    console.log('Temp file deleted.')
                }
            })
        }
    }
}

export default new ImagensController()
