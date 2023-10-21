// Libs
import multer from 'multer'
import { resolve, extname } from 'path'
import { Request, Response, NextFunction, query } from 'express'
// Scripts
import { responseMessage } from '../scripts/responseMessage'

const storage = multer.diskStorage({

    destination: resolve(__dirname, '..', 'temp'),

    filename: (req, file, cb) => {

        const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        return cb(null, file.fieldname + '-' + unique_suffix + extname(file.originalname))

    }

})

export const uploadSingleImageMiddleware = (req: Request, res: Response, next: NextFunction)=> {

    const store = multer({
        storage: storage,
        limits: {
            fileSize: (2**20) * 30 // 30 MegaBytes
        }
    }).single('image')

    store(req, res, (error) => {

        if(error instanceof multer.MulterError) {

            return res.status(400).json(responseMessage(`Erro durante o envio do arquivo.`, error.message))

        }else if (error) {

            return res.status(500).json(responseMessage('Erro interno de servidor.'))

        }else if(!req.file){

            return res.status(400).json(responseMessage('Arquivo não enviado.'))

        }else{

            return next()

        }

    })

}
