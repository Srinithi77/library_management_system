import { Entity,Column,PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Member } from "./Member";
import { Book } from "./Book";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Book)
    @JoinColumn({name:"book_id"})
    book : Book

    @ManyToOne(()=>Member)
    @JoinColumn({name:"Member_id"})
    mem : Member

    @Column()
    status: string
}