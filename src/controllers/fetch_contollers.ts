import { Request,Response } from "express";
import { Repository } from "typeorm";
import { Book } from "../models/Book";
import { AppDataSource } from "../data-souce";

export const getAll = async (req: Request, res: Response) => {
    try {
       const bookRepository: Repository<Book> = AppDataSource?.getRepository(Book);
       const book_list: Book[] = await bookRepository.find();
       return res.status(200).json({
          books: book_list,
       });
    } catch (err) {
       console.log(err);
    }
};

export const insertData =async (req: Request, res: Response) => {
    try {
        const { title,category,availableCopies } = req.body;
        const book = new Book();
        book.title = title;
        book.category = category;
        book.availableCopies = availableCopies;
        const bookRepository = AppDataSource.getRepository(Book);
        const savedBook = await bookRepository.save(book);
        return res
          .status(200)
          .json({ message: "Book inserted successfully", book: savedBook });
    }catch (err) {
        console.log(err);
    }
};

export const updateBook =async (req: Request,res: Response) => {
    try {
        const bookName = req.params.name;
        const bookRepository = AppDataSource.getRepository(Book);
        const bookToUpdate = await bookRepository.findOne({where:{ title: bookName}});
        if(!bookToUpdate){
            return res.status(404).json({messge: 'Book not found'});
        }
        const {title,category,availableCopies} = req.body;
        bookToUpdate.title = title || bookToUpdate.title;
        bookToUpdate.category = category || bookToUpdate.category;
        bookToUpdate.availableCopies = availableCopies || bookToUpdate.availableCopies;
        const updatedBook = await bookRepository.save(bookToUpdate);
        return res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        })
    } catch (err) {
        console.log(err);
    }
};

export const deleteBook =async (req:Request,res: Response) => {
    try {
        const bookName = req.params.name;
        const bookRepository = AppDataSource.getRepository(Book)
        const bookToDelete = await bookRepository.findOne({where : {title:bookName}})
        if(!bookToDelete){
            return res.status(404).json({messge: 'Book not found'});
        }
        const deletedBook = await bookRepository.remove(bookToDelete);
        return res.status(200).json({
            message: 'Book deleted successfully',
            deletedBook : deleteBook
        })
    } catch (err) {
        console.log(err)
    }
}