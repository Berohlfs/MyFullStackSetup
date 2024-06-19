// Libs
import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
// Loading environment variables
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV || 'development'
const envFile = `.env.${env}`
const envPath = path.resolve(__dirname, '..', envFile)

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  console.warn(`Warning: ${envFile} does not exist!`)
}

// Routes
import routes from './routes'

const cors_config = {
    origin: process.env.ORIGIN
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes.
    limit: 100,
    standardHeaders: 'draft-7', // combined `RateLimit` response header.
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: {
        message: 'Número máximo de requisições atingido!'
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

app.server.listen(process.env.PORT, () => console.log(`Server up on port ${process.env.PORT}. Environment (${env})`))