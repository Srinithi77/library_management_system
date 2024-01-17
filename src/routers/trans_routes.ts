import express, {Express, Request,Response, Router} from "express"
import { getAll, insertTransIssue,insertTransReturn } from "../controllers/trans_controller"

const trans_router : Router = express.Router()

trans_router.get("/",getAll)
trans_router.post("/issue",insertTransIssue)
trans_router.post("/return",insertTransReturn)

export default trans_router;