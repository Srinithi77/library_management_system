import { Request,Response } from "express";
import { Member } from "../models/Member"; 
import { createNewMember, deleteMemberById, findAllMembers, findMemberById, updateMemberById } from "../services/members_services";

export const getAll = async (req: Request, res: Response) => {
       const mem_list: Member[] = await findAllMembers();
       return res.status(200).json({
          members: mem_list,
       });
};

export const insertMember =async (req: Request, res: Response) => {
        const savedMember = await createNewMember(req.body);
        return res
          .status(200)
          .json({ message: "Member inserted successfully", member: savedMember });
};

export const updateMember =async (req: Request,res: Response) => {
        const memId = parseInt(req.params.id,10);
        const existingMember = await findMemberById(memId);
        if(!existingMember){
            return res.status(404).json({messge: 'Member not found'});
        }
        const updatedMember = await updateMemberById(memId,req.body);
        return res.status(200).json({
            message: 'Member updated successfully',
            member: updatedMember
        })
};

export const deleteMember =async (req:Request,res: Response) => {
        const memId = parseInt(req.params.id,10);
        const existingMember = await findMemberById(memId);
        if(!existingMember){
            return res.status(404).json({messge: 'Member not found'});
        }
        const deletedMember = await deleteMemberById(memId)
        return res.status(200).json({
            message: 'Member deleted successfully',
            deletedMember : deletedMember
        })
}