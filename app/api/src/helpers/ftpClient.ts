// Libs
import * as ftp from 'basic-ftp'

export const generateFtpClient = async () => {
    try {
        const client = new ftp.Client()

        client.ftp.verbose = true

        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            port: Number(process.env.FTP_PORT),
            password: process.env.FTP_PASSWORD,
            secure: process.env.FTP_SECURE === 'true' ? true : false
        })

        return client
    } catch (error) {
        throw new Error('Error while generating an FTP client.')
    }
}
