// Libs
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
// Scripts
import { responseMessage } from '../scripts/responseMessage'

dotenv.config()

type Decoded = {
    usuario_id: string,
    iat: number,
    ext: number
}

export default (req: Request, res: Response, next: NextFunction)=>{

    const cookie = req.cookies.ACCESS_TOKEN

    if(!cookie){return res.status(401).json(responseMessage('Token não fornecido.'))}

    jwt.verify(cookie.split(' ')[1], process.env['ACCESS_SECRET'], (erro: jwt.VerifyErrors | null, decoded: Decoded | undefined)=>{

        if(erro){return res.status(401).json(responseMessage('Token inválido.'))}

        req.body.usuario_id = decoded.usuario_id

        next()

    })
}
