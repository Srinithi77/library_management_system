import { AppDataSource } from "../data-souce";
import { Transaction } from "../models/Transaction";
import { Repository } from "typeorm";
import { Book } from "../models/Book";
import { Member } from "../models/Member";

const transRespository : Repository<Transaction> = AppDataSource?.getRepository(Transaction)
const bookRepository : Repository<Book> = AppDataSource.getRepository(Book);
const memRepository : Repository<Member> = AppDataSource.getRepository(Member);

export const getAllTrans = async () => {
    return await transRespository.find();
}

export const createNewTransIssue = async (transData: any): Promise<Transaction> => {
        const {book_id,mem_id,status} = transData;
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
                    return null;
                }
            }
            const trans = new Transaction()
            trans.book = book
            trans.mem = mem
            trans.status = status
            return await transRespository.save(trans)
        }
}

export const createNewTransReturn = async (transData: any): Promise<Transaction> => {
    const {book_id,mem_id,status} = transData;
    const book : Book = await bookRepository.findOne({where:{id : book_id}})
    const mem : Member = await memRepository.findOne({where:{id:mem_id}})
    if(book && mem){
        book.availableCopies += 1
        await bookRepository.save(book)
        console.log("Book returned successfully")
    }
    const trans = new Transaction()
    trans.book = book
    trans.mem = mem
    trans.status = status
    return await transRespository.save(trans)
}