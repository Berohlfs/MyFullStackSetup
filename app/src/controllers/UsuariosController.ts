// Libs
import argon2 from 'argon2'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
// Utils
import { responseMessage, server_error_msg } from '../utils/general'
// Prisma
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class UsuariosController {
    async index(req: Request, res: Response) {
        try {
            const usuarios = await prisma.user.findMany()

            usuarios.forEach((usuario) => {
                usuario.senha = ''
            })

            return res.status(200).json(responseMessage('Listagem de usuários.', usuarios))
        } catch (error) {
            console.error(error)
            return res.status(500).json(server_error_msg)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validation = z
                .object({
                    senha: z.string().min(1),
                    confirmacaoSenha: z.string().min(1),
                    email: z.string().min(1)
                })
                .refine((data) => data.confirmacaoSenha === data.senha)

            if (validation.safeParse(req.body).success === false) {
                return res.status(400).json(responseMessage('Dados inválidos.'))
            }

            const { email, senha } = req.body as z.infer<typeof validation>

            const hash = await argon2.hash(senha)

            const usuario = await prisma.user.create({
                data: { email, senha: hash }
            })

            usuario.senha = ''
            usuario.id = ''

            return res.status(201).json(responseMessage('Usuário criado.', usuario))
        } catch (error) {
            console.error(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(409).json(responseMessage('Este e-mail já é cadastrado.'))
                }
            }
            return res.status(500).json(server_error_msg)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const validation = z.object({
                senha: z.string().min(1),
                email: z.string().email()
            })

            const validation_data = validation.safeParse(req.body)

            if (validation_data.success === false) {
                return res.status(400).json(responseMessage('Dados inválidos.', validation_data.error))
            }

            const { senha, email } = req.body as z.infer<typeof validation>

            const usuario = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!usuario) {
                return res.status(400).json(responseMessage('Credenciais inválidas.'))
            }

            const match = await argon2.verify(usuario.senha, senha)

            if (match) {
                const token = jwt.sign({ usuarioId: usuario.id }, process.env.ACCESS_SECRET as string)

                return res.status(201).json(responseMessage('Login realizado com sucesso.', token))
            } else {
                return res.status(400).json(responseMessage('Credenciais inválidas.'))
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json(server_error_msg)
        }
    }
}

export default new UsuariosController()
