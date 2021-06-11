import { createConnection } from "typeorm"
const { pgUser, pgPass, dbName } = process.env

const connection = async (): Promise<void> => {
  await createConnection({
    type: 'postgres',
    database: dbName,
    username: pgUser,
    password: pgPass,
    logging: true,
    entities: []
  })
}

export default connection