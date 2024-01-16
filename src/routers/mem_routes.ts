import express, {Express, Request,Response, Router} from "express"
import { getAll,insertMember,updateMember,deleteMember } from "../controllers/member_controller"

const mem_router : Router = express.Router()

mem_router.get("/",getAll)
mem_router.post("/",insertMember)
mem_router.put("/:name",updateMember)
mem_router.delete("/:name",deleteMember)

export default mem_router;