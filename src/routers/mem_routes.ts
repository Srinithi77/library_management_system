import express, {Router} from "express"
import { getAll,insertMember,updateMember,deleteMember } from "../controllers/member_controller"

const mem_router : Router = express.Router()

mem_router.get("/",getAll)
mem_router.post("/",insertMember)
mem_router.put("/:id",updateMember)
mem_router.delete("/:id",deleteMember)

export default mem_router;