# MyNodeFramework

Meu mini framework pessoal de Node.js.

## Libs utilizadas neste projeto

* `bcrypt` para criptografar senhas.
* `cors` para configurar o compartilhamento de recursos com origens externas.
* `dotenv` para facilitar o uso de variáveis de ambiente.
* `express` para construir a API.
* `jsonwebtoken` para autenticar usuários.
* `zod` para validar a corpo das requisições.
* `nodemon` para manter o servidor ininterrupto durante o desenvolvimento.
* `typescript` para incrementar tipagem estática e IntelliSense avançado ao projeto.
* `ts-node` para transpilar o código de TypeScript para JavaScript durante o desenvolvimento.
* `prisma` para facilitar o uso da interface de comando (CLI) do Prisma ORM.
* `@prisma/client` para efetuar consultas ao banco de dados por meio do Prisma ORM.
* `nodemailer` para disparar e-mails.
* `multer` para auxiliar o recebimento de arquivos.
* `sharp` para comprimir, redimensionar e converter imagens.
* `basic-ftp` para amparar o envio de arquivos via protocolo FTP.
* `express-rate-limit` para configurar e limitar a frequência de requisições vindas de um IP.

## Extensões do VSCode recomendadas

* Prisma
* REST Client

## Mock .env file

```
DATABASE_URL="mysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

ORIGIN=""
PORT=""

ACCESS_SECRET=""

FTP_HOST=""
FTP_USER=""
FTP_PORT=""
FTP_PASSWORD=""
FTP_SECURE="true"

EMAIL_HOST=""
EMAIL_PORT=""
EMAIL_USER=""
EMAIL_PASSWORD=""
EMAIL_SECURE="true"
```
