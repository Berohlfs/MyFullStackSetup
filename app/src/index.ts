// Libs
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'
// Routes
import routes from './routes'

const cors_config = {
    origin: process.env.ORIGIN
}

dotenv.config()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes.
    limit: 100,
    standardHeaders: 'draft-7', // combined `RateLimit` response header.
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: {
        message: 'Número máximo de requisições atingido.'
    } as { message: string }
})

class App {
    server: express.Application

    constructor() {
        this.server = express()
        this.middlewares()
    }
    middlewares() {
        this.server.use(limiter)
        this.server.use(express.json())
        this.server.use(cors(cors_config))
        this.server.use(routes)
    }
}

const app = new App()

app.server.listen(process.env.PORT, () => console.log(`Server up on port ${process.env.PORT}.`))
