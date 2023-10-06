// Libs
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
// Scripts
import { responseMessage } from '../scripts/responseMessage'

dotenv.config()

type Decoded = {
    usuario_id: string,
    remote_address: string,
    iat: number,
    ext: number
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    const token = req.headers['authorization'].split(' ')[1]

    // console.log(token)

    if(!token){return res.status(401).json(responseMessage('Token não fornecido.'))}

    jwt.verify(token, process.env['ACCESS_SECRET'], (erro: jwt.VerifyErrors | null, decoded: Decoded | undefined)=>{

        if(erro){return res.status(401).json(responseMessage('Token inválido.'))}

        if(decoded.remote_address != req.socket.remoteAddress){return res.status(401).json(responseMessage('Token inválido.'))}

        // console.log('decoded' + decoded.remote_address, 'ip' + req.socket.remoteAddress)

        req.body.usuario_id = decoded.usuario_id

        next()

    })
}
