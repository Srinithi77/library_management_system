import express, {Express, Request, Response, Router} from "express";
import { AppDataSource } from "./data-souce";
import router from "./routers/routes";
import mem_router from "./routers/mem_routes";
import trans_router from "./routers/trans_routes";
import dotenv from "dotenv"

const env = dotenv.config();

const app : Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use("/books",router)
app.use("/members",mem_router)
app.use("/trans",trans_router)

app.get("/",(req: Request, res: Response)=>{
    res.send("<h1>Helloo!</h1>")
})

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})

AppDataSource.initialize()
   .then(() => {
      console.log('Database connected successfully !');
   })
   .catch((err) => {
      console.error('Database connection failed', err);
   });