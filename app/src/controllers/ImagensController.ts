// Libs
import * as yup from 'yup'
import { Request, Response } from 'express'
import sharp from 'sharp'
import { resolve } from 'path'
import fs from 'fs'
// Scripts
import { responseMessage } from '../scripts/utils'
import { generateUniqueFileName } from '../scripts/utils'
import { generateFtpClient } from '../scripts/ftpClient'

class ImagensController {

    async create(req: Request, res: Response){

        const temp_file_name = generateUniqueFileName()

        try{
            const compressed = await sharp(req.file?.buffer)
            .rotate()
            .webp()
            .resize(1000)
            .toFile(resolve(__dirname, '..', 'temp', temp_file_name))

            const ftp_client = await generateFtpClient()

            await ftp_client.uploadFrom(resolve(__dirname, '..', 'temp', temp_file_name), temp_file_name + '.webp')

            return res.status(200).json(responseMessage('Upload de imagem realizado com sucesso.'))

        }catch(error){

            console.log(error)
            return res.status(500).json(responseMessage('Erro interno de servidor.'))

        }finally{
            fs.unlink(resolve(__dirname, '..', 'temp', temp_file_name), (error)=>{
                if(error){
                    console.log('Failed to delete temp file.')
                }else{
                    console.log('Temp file deleted.')
                }
            })
        }
    }

}

export default new ImagensController()
