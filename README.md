# MyNodeFramework

Meu mini framework pessoal de Node.js.

## Libs utilizadas

* `bcrypt` para criptografia de senhas.
* `cookie-parser` para facilitar o recebimento de cookies de autenticação.
* `cors` para configurar o recebimento de requisições provenientes de domínios externos (*Cross-Origin Resource Policy*).
* `dotenv` para facilitar o uso de variáveis de ambiente.
* `express` para roteamento e construção do servidor.
* `jsonwebtoken` para autenticação de usuários.
* `typeorm` para mapear e e conduzir tarefas que acessam o banco de dados (ORM).
* `mysql2` para fornecer ao ORM uma interface de acesso ao banco de dados.
* `reflect-metadata` para manter o código mais legível (usado internamente pelo TypeORM).
* `yup` para validar a corpo das requisições.
* `nodemon` para manter o servidor ininterrupto durante o desenvolvimento.
* `typescript` para incrementar tipagem estática e IntelliSense avançado ao projeto.
* `ts-node` para transpilar o código de TypeScript para JavaScript durante o desenvolvimento.

## Como começar

* [x] Instale as dependências do projeto.
* [x] Adicione um arquivo '.env' dentro da pasta 'app' (**este tipo de arquivo fica listado como 'gitignore', ou seja, nunca deverá ser 'commitado'**).
* [x] Configure o arquivo '.env' da seguinte forma:

```
PORT = 5500
ORIGIN = "http://localhost:3000" # Domínio do cliente (frontend)
ENV = "dev"

ACCESS_SECRET = "adicione_seu_secret_aqui" # Secret personalizado para gerar o tokens

DATABASE_HOST = "localhost"
DATABASE_USERNAME = "root"
DATABASE_PASSWORD = "senha"
DATABASE_NAME = "mybd"
DATABASE_PORT = 3306

```

* [x] Por fim, acesse a pasta 'app' (`cd app`) e execute o comando `yarn start` ou `npm start` (dependendo do package maneger escolhido).
