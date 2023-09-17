import { DataSource } from "typeorm"
// Libs
import dotenv from 'dotenv'

dotenv.config()

export const DB = new DataSource({
    type: "mysql",
    host: process.env["DATABASE_HOST"],
    port: Number(process.env["DATABASE_PORT"]),
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
    database: process.env["DATABASE_NAME"],
    logging: true,
    // synchronize: true, // Must remove on production (use migrations)
    entities: ["src/models/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"]
})
