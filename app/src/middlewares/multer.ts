// Libs
import multer from 'multer'
import { resolve, extname } from 'path'
import { Request, Response, NextFunction } from 'express'
// Scripts
import { responseMessage } from '../utils/general'
import { generateUniqueFileName } from '../utils/general'

const storage = multer.diskStorage({
    destination: resolve(__dirname, '..', 'temp'),

    filename: (req, file, cb) => {
        return cb(null, generateUniqueFileName() + extname(file.originalname))
    }
})

export const uploadSingleImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const store = multer({
        storage: multer.memoryStorage(), // ou 'storage'
        limits: {
            fileSize: 2 ** 20 * 30 // 30 MegaBytese
        }
    }).single('image')

    store(req, res, (error) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                return res.status(400).json(responseMessage(`Erro durante o envio do arquivo.`, error.message))
            }

            return res.status(500).json(responseMessage('Erro interno de servidor.'))
        } else if (!req.file) {
            return res.status(400).json(responseMessage('Arquivo não enviado.'))
        } else {
            return next()
        }
    })
}
