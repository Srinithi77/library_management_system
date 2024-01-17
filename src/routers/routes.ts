import express, {Router} from "express"
import { deleteBook, getAll, insertData, updateBook } from "../controllers/fetch_contollers"

const router : Router = express.Router()

router.get("/", getAll)
router.post("/",insertData)
router.put('/:id',updateBook)
router.delete('/:id',deleteBook)

export default router