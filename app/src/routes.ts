// Libs
import { Router } from 'express'
// Controllers
import UsuariosController from './controllers/UsuariosController'
import CarrosController from './controllers/CarrosController'
import ImagensController from './controllers/ImagensController'
// Middlewares
import { authMiddleware } from './middlewares/auth'
import { uploadSingleImageMiddleware } from './middlewares/multer'
// Scripts
import { responseMessage } from './scripts/utils'

const routes = Router()

// Public routes

    routes.post('/login', UsuariosController.login)
    routes.post('/cadastro', UsuariosController.create)
    routes.get('/usuarios', UsuariosController.index)

    routes.post('/carros', CarrosController.create)

    routes.post('/imagens', uploadSingleImageMiddleware, ImagensController.create)

// Authenticated routes
routes.use(authMiddleware)

    routes.get('/token', (req, res)=> res.json(responseMessage(`User Id --> ${req.body.usuario_id}`)))

    routes.use((req, res)=> res.status(404).json(responseMessage('Resource Not Found'))) // Fallback


export default routes
