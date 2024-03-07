// Libs
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
// Utils
import { responseMessage } from '../utils/general'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

    //console.log(token)

    if (!token) {
        return res.status(401).json(responseMessage('Token não fornecido.'))
    }

    jwt.verify(
        token,
        process.env.ACCESS_SECRET as string,
        (error: VerifyErrors | null, decoded: string | undefined | JwtPayload) => {
            if (error) {
                return res.status(401).json(responseMessage('Token inválido.'))
            }

            if (typeof decoded === 'object') {
                if (!decoded.usuarioId) {
                    return res.status(401).json(responseMessage('Token inválido.'))
                }

                req.body.usuarioId = decoded.usuarioId

                return next()
            } else {
                return res.status(401).json(responseMessage('Token inválido.'))
            }
        }
    )
}