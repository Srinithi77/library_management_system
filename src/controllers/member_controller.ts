import { Request,Response } from "express";
import { Repository } from "typeorm";
import { Member } from "../models/Member"; 
import { AppDataSource } from "../data-souce";

export const getAll = async (req: Request, res: Response) => {
    try {
       const memRepository: Repository<Member> = AppDataSource?.getRepository(Member);
       const mem_list: Member[] = await memRepository.find();
       return res.status(200).json({
          members: mem_list,
       });
    } catch (err) {
       console.log(err);
    }
};

export const insertMember =async (req: Request, res: Response) => {
    try {
        const { name,booksBorrowed,booksReturned } = req.body;
        const mem = new Member();
        mem.name = name;
        mem.booksBorrowed = booksBorrowed;
        mem.booksReturned = booksReturned
        const memRepository = AppDataSource.getRepository(Member);
        const savedMember = await memRepository.save(mem);
        return res
          .status(200)
          .json({ message: "Member inserted successfully", member: savedMember });
    }catch (err) {
        console.log(err);
    }
};

export const updateMember =async (req: Request,res: Response) => {
    try {
        const memName = req.params.name;
        const memRepository = AppDataSource.getRepository(Member);
        const memToUpdate = await memRepository.findOne({where:{name: memName}});
        if(!memToUpdate){
            return res.status(404).json({messge: 'Member not found'});
        }
        const {booksBorrowed,booksReturned} = req.body;
        memToUpdate.booksBorrowed = booksBorrowed || memToUpdate.booksBorrowed;
        memToUpdate.booksReturned = booksReturned || booksReturned.category;
        const updatedMember = await memRepository.save(memToUpdate);
        return res.status(200).json({
            message: 'Member updated successfully',
            member: updatedMember
        })
    } catch (err) {
        console.log(err);
    }
};

export const deleteMember =async (req:Request,res: Response) => {
    try {
        const memName = req.params.name;
        const memRepository = AppDataSource.getRepository(Member)
        const memToDelete = await memRepository.findOne({where : {name:memName}})
        if(!memToDelete){
            return res.status(404).json({messge: 'Member not found'});
        }
        const deletedMember = await memRepository.remove(memToDelete);
        return res.status(200).json({
            message: 'Member deleted successfully',
            deletedMember : deletedMember
        })
    } catch (err) {
        console.log(err)
    }
}