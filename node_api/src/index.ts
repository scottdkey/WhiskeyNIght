import Koa from "koa"
import indexRouter from "./Routes/indexRoutes"
import { config } from "dotenv"
import session from 'koa-session'
import { createConnection } from "typeorm";
import RedisStore from "koa-redis"
import 'reflect-metadata'
// import { buildSchema } from "type-graphql"
// import { ApolloServer } from "apollo-server-koa"
config()


const main = async () => {
  await createConnection({
    type: "mongodb",
    database: "whiskeyNight",
    username: "mongoUser",
    password: "mongoPass",
    logging: true,
    synchronize: true,
    entities: []
  })
  const app = new Koa()
  app.keys = ["keys", "lots of keys"]
  const redis = RedisStore({
    port: 6379,
    host: "localhost",
    prefix: "pli",
  })
  app.use(session({
    store: redis,
    maxAge: 1000 * 60 * 60 * 24 * 7, //sessions last a week
  }, app))

  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [],
  //     validate: false

  //   }),
  //   context: ({ ctx }) => ({ ctx, redis })
  // })

  app.use(indexRouter.routes())

  const PORT = 5000

  app.listen(PORT, () => {
    console.log(`Server Listening on port: ${PORT}`)
  })
}

main().catch(err => {
  console.error(err)
})