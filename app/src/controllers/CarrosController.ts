// Libs
import { z } from 'zod'
import { Request, Response } from 'express'
// Utils
import { responseMessage } from '../utils/general'
// Prisma
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class CarrosController {
    async create(req: Request, res: Response) {
        try {
            const validation = z.object({
                apelido: z.string().min(1),
                usuarioId: z.string().uuid()
            })

            if (validation.safeParse(req.body).success === false) {
                return res.status(400).json(responseMessage('Dados inválidos.'))
            }

            const { apelido, usuarioId } = req.body as z.infer<typeof validation>

            const usuario = await prisma.carro.create({
                data: { apelido, usuarioId: usuarioId }
            })

            return res.status(201).json(responseMessage('Carro criado.', usuario))
        } catch (error) {
            console.error(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    return res
                        .status(400)
                        .json(responseMessage('Impossível vincular carro a um usuário não existente.'))
                }
            }
            return res.status(500).json(responseMessage('Erro interno de servidor.'))
        }
    }
}

export default new CarrosController()
