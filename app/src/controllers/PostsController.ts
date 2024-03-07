// Libs
import { z } from 'zod'
import { Request, Response } from 'express'
// Utils
import { responseMessage, server_error_msg } from '../utils/general'
// Prisma
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class PostsController {
    async create(req: Request, res: Response) {
        try {
            const validation = z.object({
                descricao: z.string().min(1),
                usuarioId: z.string().uuid()
            })

            if (validation.safeParse(req.body).success === false) {
                return res.status(400).json(responseMessage('Dados inválidos.'))
            }

            const { descricao, usuarioId } = req.body as z.infer<typeof validation>

            const usuario = await prisma.post.create({
                data: { descricao, usuarioId: usuarioId }
            })

            return res.status(201).json(responseMessage('Post criado.', usuario))
        } catch (error) {
            console.error(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    return res
                        .status(400)
                        .json(responseMessage('Impossível vincular post a um usuário não existente.'))
                }
            }
            return res.status(500).json(server_error_msg)
        }
    }
}

export default new PostsController()
