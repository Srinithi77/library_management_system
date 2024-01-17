import {Response, Request} from "express"
import { Transaction } from "../models/Transaction"
import { createNewTransIssue, createNewTransReturn, getAllTrans } from "../services/transaction_services"

export const getAll =async (req:Request,res: Response) => {
        const trans_list : Transaction[] = await getAllTrans()
        return res.status(200).json({
            transaction_list : trans_list
        })
}


export const insertTransIssue = async (req:Request,res: Response) => {
        const savedTrans = await createNewTransIssue(req.body);
        if(savedTrans){
            return res.status(200).json({
                message: "Transaction is inserted successfully",
                savedTransaction : savedTrans
        })
        }else{
            return res.status(404).json({
                message:"Out of stock"
            })
        }  
}

export const insertTransReturn = async (req: Request,res: Response) => {
        const savedTrans = await createNewTransReturn(req.body);
        return res.status(200).json({
            message: "Transaction is inserted successfully",
            savedTransaction : savedTrans
    });
}