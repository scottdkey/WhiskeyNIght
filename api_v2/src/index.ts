import Koa from "koa"
import body from "koa-bodyparser"
import cors from "@koa/cors"
import indexRouter from "./routes/index"
import { config } from "dotenv";


config()
const { PORT } = process.env
const app = new Koa()
app.use(body({}))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(indexRouter.routes())

const server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`)
})
export default server
