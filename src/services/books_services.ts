import { AppDataSource } from "../data-souce";
import { Book } from "../models/Book";
import { Repository } from "typeorm";

export const bookRepository: Repository<Book> = AppDataSource.getRepository(Book);

export const getAllBooks = async () => {
    return await bookRepository.find();
}

export const createNewBook = async (bookData: any) : Promise<Book> => {
        const { title,category,availableCopies } = bookData;
        const book = new Book();
        book.title = title;
        book.category = category;
        book.availableCopies = availableCopies;
        const bookRepository = AppDataSource.getRepository(Book);
        return await bookRepository.save(book);
}

export const findBookById = async (id: number) => {
        return await bookRepository.findOne({where:{id:id}});
}

export const updateBookById = async (id: number, data: Partial<Book>) => {
        const bookToUpdate = await bookRepository.findOne({where:{id:id}});
        bookToUpdate.title = data.title || bookToUpdate.title;
        bookToUpdate.category = data.category || bookToUpdate.category;
        bookToUpdate.availableCopies = data.availableCopies || bookToUpdate.availableCopies;
        return await bookRepository.save(bookToUpdate);
}

export const deleteBookById = async (id: number) => {
        const bookToDelete = await bookRepository.findOne({where:{id:id}});
        return await bookRepository.remove(bookToDelete);
}