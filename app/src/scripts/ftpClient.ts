// Libs
import * as ftp from 'basic-ftp'

const client = new ftp.Client()

client.ftp.verbose = process.env.FTP_VERBOSE === 'true' ? true : false

export const generateFtpClient = async()=> {
    try{

        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            port: Number(process.env.FTP_PORT),
            password: process.env.FTP_PASSWORD,
            secure: process.env.FTP_SECURE === 'false' ? false : true
        })

        return client
    }catch(error){
        throw 'Error while generating an FTP client.'
    }
}
