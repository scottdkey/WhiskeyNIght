import Router from "koa-router"


const router = new Router()


router.get("/", async (ctx) => {
  ctx.body = { message: "Working" }
  ctx.status = 200
})

router.get('/test', async (ctx) => {
  ctx.body = { message: "Test" }
  ctx.status = 200
})

export default router