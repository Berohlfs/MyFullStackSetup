// Libs
import dotenv from 'dotenv'
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
// Scripts
import { responseMessage } from '../scripts/responseMessage'

dotenv.config()

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : false

    // console.log(token)

    if(token === false){return res.status(401).json(responseMessage('Token não fornecido.'))}

    jwt.verify(token, process.env['ACCESS_SECRET'] as string, (erro: VerifyErrors | null, decoded: string | undefined | JwtPayload)=>{

        if(erro){return res.status(401).json(responseMessage('Token inválido.'))}

        if(typeof decoded === 'object'){

            if(decoded.remote_address != req.socket.remoteAddress || !decoded.usuario_id){return res.status(401).json(responseMessage('Token inválido.'))}

            req.body.usuario_id = decoded.usuario_id

        }

        next()

    })
}
