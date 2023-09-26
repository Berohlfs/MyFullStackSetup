import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('Usuario')
export class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    senha: string

}
