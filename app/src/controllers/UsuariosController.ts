// Libs
import bcrypt from 'bcrypt'
import * as yup from 'yup'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
// TypeORM
import { Usuario } from '../models/Usuario'
import { DB } from '../db'

const usuarioRepository = DB.getRepository(Usuario)

class UsuariosController {

    async create(req: Request, res: Response) {
        try {
            const validation = yup.object({
                senha: yup.string().required(),
                confirmacaoSenha: yup.string().oneOf([yup.ref('senha'), null]).required(),
                email: yup.string().required().email(),
            })

            const valid = await validation.isValid(req.body)

            if (!valid) { return res.status(400).json({ erro: 'Dados inválidos.' }) }

            const { email, senha } = req.body

            const exists = await usuarioRepository.findOne({
                where: {
                    email
                }
            })

            if (exists) { return res.status(409).json({ erro: 'E-mail já cadastrado.' }) }

            const hash = await bcrypt.hash(senha, 13)

            const usuario = new Usuario()

            usuario.email = email
            usuario.senha = hash

            const data = await usuarioRepository.save(usuario)

            return res.status(201).json(data)
        } catch (erro) {
            console.error(erro)
            return res.status(500).json({ erro: 'Internal Server Error.' })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const validation = yup.object({
                senha: yup.string().required(),
                email: yup.string().required(),
            })

            const valid = await validation.isValid(req.body)

            if (!valid) { return res.status(400).json({ erro: 'Dados inválidos.' }) }

            const { senha, email } = req.body

            const usuario = await usuarioRepository.findOne({
                where: {
                    email
                }
            })

            if (!usuario) { return res.status(404).json({ erro: 'Usuário inexistente.' }) }

            const match = await bcrypt.compare(senha, usuario.senha)

            if (match) {
                const token = jwt.sign({usuario_id: usuario.id}, process.env['ACCESS_SECRET'], {expiresIn: '1d'})

                return res.status(201).cookie("ACCESS_TOKEN", 'Bearer ' + token, {
                    secure: process.env['ENV'] !== "dev" ? true : false,
                    httpOnly: true,
                    expires: new Date(Date.now() + 24 * 3600000),
                    sameSite: 'none'
                }).json({ tag: 'Cookie received.' })
            } else {
                return res.status(400).json({ erro: 'Credenciais inválidas.' })
            }

        } catch (erro) {
            console.error(erro)
            return res.status(500).json({ erro: 'Internal Server Error.' })
        }
    }

}

export default new UsuariosController()
