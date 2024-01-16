import express, {Router, Request,Response} from "express"
import { Book } from "../models/Book"
import { deleteBook, getAll, insertData, updateBook } from "../controllers/fetch_contollers"

const router : Router = express.Router()

router.get("/", getAll)
router.post("/",insertData)
router.put('/:name',updateBook)
router.delete('/:name',deleteBook)

export default router