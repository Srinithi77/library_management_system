import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    booksBorrowed: number

    @Column()
    booksReturned: number
}