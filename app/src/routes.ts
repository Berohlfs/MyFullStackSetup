// Libs
import { Router } from 'express'
// Controllers
import UsuariosController from './controllers/UsuariosController'
import CarrosController from './controllers/CarrosController'
// Middlewares
import { authMiddleware } from './middlewares/auth'
import { uploadSingleImageMiddleware } from './middlewares/multer'
// Scripts
import { responseMessage } from './scripts/responseMessage'

const routes = Router()

// Public routes

    routes.post('/image', uploadSingleImageMiddleware, (req, res)=> { res.json(responseMessage('Arquivo salvo em disco.'))})

    routes.post('/login', UsuariosController.login)
    routes.post('/cadastro', UsuariosController.create)
    routes.get('/usuarios', UsuariosController.index)

    routes.post('/carros', CarrosController.create)

// Authenticated routes
routes.use(authMiddleware)

    routes.get('/token', (req, res)=> res.json(responseMessage(`User Id --> ${req.body.usuario_id}`)))

    routes.use((req, res)=> res.status(404).json(responseMessage('Resource Not Found'))) // Fallback


export default routes
