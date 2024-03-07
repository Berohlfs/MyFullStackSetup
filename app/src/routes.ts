// Libs
import { Router } from 'express'
import sharp from 'sharp'
// Controllers
import UsuariosController from './controllers/UsuariosController'
import CarrosController from './controllers/PostsController'
// Middlewares
import { authMiddleware } from './middlewares/auth'
import { uploadSingleFileMiddleware } from './middlewares/multer'
// Utils
import { responseMessage, generateUniqueFileName, server_error_msg } from './utils/general'
// Helpers
import { mailer } from './helpers/nodemailer'
import { generateFtpClient } from './helpers/ftpClient'
// Node
import { resolve } from 'path'
import fs from 'fs'

const routes = Router()

// Public routes

routes.post('/login', UsuariosController.login)
routes.post('/cadastro', UsuariosController.create)

// Authenticated routes

routes.use(authMiddleware)

routes.get('/usuarios', UsuariosController.index)

routes.post('/carros', CarrosController.create)

routes.post('/imagens', uploadSingleFileMiddleware, async(req, res)=> {

    const temp_file_name = generateUniqueFileName()

    try {
        await sharp(req.file?.buffer)
            .webp()
            .rotate()
            .resize(1000)
            .toFile(resolve(__dirname, '.', 'temp', temp_file_name))

        const client = await generateFtpClient()

        await client.uploadFrom(resolve(__dirname, '.', 'temp', temp_file_name), temp_file_name + '.webp')

        client.close()

        return res.status(200).json(responseMessage('Upload de imagem realizado com sucesso.'))
    } catch (error) {
        console.error(error)
        if(error instanceof Error){
            if(error.message.includes('unsupported image format')){
                return res.status(400).json(responseMessage('Tipo de arquivo não suportado.'))
            }
            return res.status(400).json(responseMessage('Erro interno não mapeado.', error.message))
        }
        return res.status(500).json(server_error_msg)
    } finally {
        fs.unlink(resolve(__dirname, '.', 'temp', temp_file_name), (error) => {
            if (error) {
                console.log('Failed to delete temp file.')
            } else {
                console.log('Temp file deleted.')
            }
        })
    }
})

routes.post('/email', async(req, res)=> {
    try{
        await mailer.send({
            to: 'berohlfs@gmail.com',
            subject: 'Teste',
            text: 'Isso é um teste.'
        })
        return res.status(200).json(responseMessage('E-mail enviado.'))
    }catch(error){
        return res.status(500).json(server_error_msg)
    }
})

// Fallback
routes.use((req, res) => res.status(404).json(responseMessage('Recurso não encontrado.')))

export default routes
