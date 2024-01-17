import { Member } from "../models/Member";
import { AppDataSource } from "../data-souce";
import { Repository } from "typeorm";

export const memRepository: Repository<Member> = AppDataSource.getRepository(Member);

export const findAllMembers = async () => {
        return await memRepository.find();
}

export const createNewMember = async (memData: any) : Promise<Member> => {
        const { name,booksBorrowed,booksReturned } = memData;
        const mem = new Member();
        mem.name = name;
        mem.booksBorrowed = booksBorrowed;
        mem.booksReturned = booksReturned
        return await memRepository.save(mem);
}

export const findMemberById = async (id: number) => {
    return await memRepository.findOne({where:{id:id}});
}

export const updateMemberById = async (id: number, data: Partial<Member>) => {
    const memToUpdate = await memRepository.findOne({where:{id:id}});
    memToUpdate.name = data.name || memToUpdate.name;
    memToUpdate.booksBorrowed = data.booksBorrowed || memToUpdate.booksBorrowed;
    memToUpdate.booksReturned = data.booksReturned || memToUpdate.booksReturned;
    return await memRepository.save(memToUpdate);
}

export const deleteMemberById = async (id: number) => {
    const bookToDelete = await memRepository.findOne({where:{id:id}});
    return await memRepository.remove(bookToDelete);
}