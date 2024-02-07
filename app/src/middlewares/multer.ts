// Libs
import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
// Scripts
import { responseMessage } from '../utils/general'

export const uploadSingleFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const multer_obj = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 2 ** 20 * 30 // 30 MegaBytese
        }
    })

    const store = multer_obj.single('file') // The 'single' method returns a new function

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
