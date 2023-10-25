// Libs
import * as yup from 'yup'
import { Request, Response } from 'express'
// Scripts
import { responseMessage } from '../scripts/utils'
// Prisma
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class CarrosController {

    async create(req: Request, res: Response) {
        try {
            const validation = yup.object({
                apelido: yup.string().required(),
                usuarioId: yup.string().required()
            })

            const valid = await validation.isValid(req.body)

            if (!valid) { return res.status(400).json(responseMessage('Dados inválidos.')) }

            const { apelido, usuarioId } = req.body

            const usuario = await prisma.carro.create({data: { apelido, usuarioId: usuarioId }})

            return res.status(201).json(responseMessage('Carro criado.', usuario))
        } catch (error) {
            console.error(error)
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2003'){ return res.status(400).json(responseMessage('Impossível vincular carro a um usuário não existente.')) }
            }
            return res.status(500).json(responseMessage('Erro interno de servidor.'))
        }
    }

}

export default new CarrosController()
