// Libs
import { Router } from 'express'
// Controllers
import UsuariosController from './controllers/UsuariosController'
import CarrosController from './controllers/CarrosController'
import ImagensController from './controllers/ImagensController'
// Middlewares
import { authMiddleware } from './middlewares/auth'
import { uploadSingleFileMiddleware } from './middlewares/multer'
// Scripts
import { responseMessage } from './utils/general'

const routes = Router()

// Public routes

routes.post('/login', UsuariosController.login)
routes.post('/cadastro', UsuariosController.create)

// Authenticated routes

routes.use(authMiddleware)

routes.get('/usuarios', UsuariosController.index)

routes.post('/carros', CarrosController.create)

routes.post('/imagens', uploadSingleFileMiddleware, ImagensController.create)

// Fallback
routes.use((req, res) => res.status(404).json(responseMessage('Recurso não encontrado.')))

export default routes
