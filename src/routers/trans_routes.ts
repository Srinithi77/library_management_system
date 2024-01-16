import express, {Express, Request,Response, Router} from "express"
import { getAll, insertTrans } from "../controllers/trans_controller"

const trans_router : Router = express.Router()

trans_router.get("/",getAll)
trans_router.post("/issue",insertTrans)
trans_router.post("/return",insertTrans)

export default trans_router;