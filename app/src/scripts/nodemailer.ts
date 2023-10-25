// Libs
import nodemailer, { Transporter } from 'nodemailer'

type SendParams = {
    to: string,
    subject: string,
    text: string,
    html?: string
}

class Mailer{

    transporter: Transporter

    constructor(){

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.EMAIL_SECURE),
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
            debug: true
        })

    }

    send({to, subject, text, html}: SendParams){

        return this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        })

    }

}

export const mailer = new Mailer()
