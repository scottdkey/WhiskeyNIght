import Router from "koa-router"

const indexRouter = new Router()

indexRouter.get('/', async (ctx) => {
  ctx.body = "Hello World"
})
indexRouter.get('/test', async (ctx) => {
  ctx.body = "This test works"
})

export default indexRouter
