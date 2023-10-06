// Libs
import { Router } from 'express'
// Controllers
import UsuariosController from './controllers/UsuariosController'
// Middlewares
import { authMiddleware } from './middlewares/auth'
// Scripts
import { mailer } from './scripts/nodemailer'
import { responseMessage } from './scripts/responseMessage'

const routes = Router()

// Public routes
routes.post('/login', UsuariosController.login)
routes.post('/cadastro', UsuariosController.create)

routes.use(authMiddleware)

// Authenticated routes
routes.get('/token', (req, res)=> res.json(req.body.usuario_id))
routes.get('/mail', async(req, res)=> {
    try{
        await mailer.send({to: 'berohlfs@gmail.com', subject: 'Teste', text: 'Teste'})
        return res.sendStatus(200)
    }catch(error){
        return res.sendStatus(500)
    }
})

routes.use((req, res)=> res.status(404).json(responseMessage('Resource Not Found')))


export default routes
