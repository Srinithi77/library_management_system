import { Request,Response } from "express";
import { Book } from "../models/Book";
import { getAllBooks,createNewBook, findBookById, updateBookById, deleteBookById } from "../services/books_services";

export const getAll = async (req: Request, res: Response) => {
       const book_list: Book[] = await getAllBooks()
       return res.status(200).json({
          books: book_list,
       });
};

export const insertData =async (req: Request, res: Response) => {
        const savedBook = await createNewBook(req.body)
        return res
          .status(200)
          .json({ message: "Book inserted successfully", book: savedBook });
};

export const updateBook =async (req: Request,res: Response) => {
        const bookId = parseInt(req.params.id,10);
        const existingBook = await findBookById(bookId)
        if(!existingBook){
            return res.status(404).json({messge: 'Book not found'});
        }
        const updatedBook = await updateBookById(bookId,req.body);
        return res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        })
};

export const deleteBook =async (req:Request,res: Response) => {
        const bookId = parseInt(req.params.id,10);
        const existingBook = await findBookById(bookId)
        if(!existingBook){
            return res.status(404).json({messge: 'Book not found'});
        }
        const deletedBook = await deleteBookById(bookId)
        return res.status(200).json({
            message: 'Book deleted successfully',
            deletedBook : deletedBook
        })
}