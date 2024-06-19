// Libs
import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
// Utils
import { responseMessage } from '../utils/general'

export const uploadSingleFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const multer_obj = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 2 ** 20 * 30 // 30 MegaBytese
        }
    })

    const store = multer_obj.single('file') // The 'single' method returns a new function

    const temp_id = req.body.usuarioId

    store(req, res, (error) => {
        if (error) {
            if (error instanceof multer.MulterError) {
                return res.status(400).json(responseMessage(`Erro durante o envio do arquivo.`, error.message))
            }

            return res.status(500).json(responseMessage('Erro interno de servidor.', error))
        } else if (!req.file) {
            return res.status(400).json(responseMessage('Arquivo não enviado.'))
        } else {
            req.body.usuarioId = temp_id
            return next()
        }
    })
}
