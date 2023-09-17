// Libs
import { Router } from 'express'
// Controllers
import UsuariosController from './controllers/UsuariosController'
// Middlewares
import authMiddleware from './middlewares/auth'

const routes = Router()


routes.post('/login', UsuariosController.login)
routes.post('/cadastro', UsuariosController.create)

routes.use(authMiddleware)

routes.get('/cookie', (req, res)=> res.json(req.body.usuario_id))


export default routes
