import {Response, Request} from "express"
import { AppDataSource } from "../data-souce"
import { Repository } from "typeorm"
import { Transaction } from "../models/Transaction"
import { Book } from "../models/Book"
import { Member } from "../models/Member"

export const getAll =async (req:Request,res: Response) => {
    try {
        const transRespository : Repository<Transaction> = AppDataSource?.getRepository(Transaction)
        const trans_list : Transaction[] = await transRespository.find();
        return res.status(200).json({
            transaction_list : trans_list
        })
    } catch (err) {
        console.log(err)
    }
}


export const insertTrans = async (req:Request,res: Response) => {
    try {
        const transRespository : Repository<Transaction> = AppDataSource?.getRepository(Transaction)
        const bookRepository : Repository<Book> = AppDataSource.getRepository(Book);
        const memRepository : Repository<Member> = AppDataSource.getRepository(Member);
        const {book_id,mem_id,status} = req.body;
        const book : Book = await bookRepository.findOne({where:{id : book_id}})
        const mem : Member = await memRepository.findOne({where:{id:mem_id}})
        if(book && mem){
            if(status === "issue"){
                if(book.availableCopies>0){
                    book.availableCopies -= 1
                    await bookRepository.save(book)
                    console.log("Book issued successfully")
                }
                else{
                    return res.status(404).json({
                        message: "Out of stock",
                    })
                }
            }
            else {
                book.availableCopies += 1
                await bookRepository.save(book)
                console.log("Book returned successfully")
            }
            const trans = new Transaction()
            trans.book = book
            trans.mem = mem
            trans.status = status
            const savedTrans = await transRespository.save(trans)
            return res.status(200).json({
                message: "Transaction is inserted successfully",
                savedTransaction : savedTrans
            })
        }
    } catch (err) {
        console.log(err)
    }
}