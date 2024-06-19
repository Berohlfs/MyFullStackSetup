export const generateUniqueFileName = () => {
    return Date.now() + '-' + Math.round(Math.random() * 1e9)
}

export const responseMessage = (message: string, data?: any) => {
    return {
        message,
        data
    }
}

export const server_error_msg = responseMessage('Erro interno de servidor.')
