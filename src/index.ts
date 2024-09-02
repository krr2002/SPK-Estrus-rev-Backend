import {Vardec} from '@src/utils/vardec'
import {pgPool} from '@src/utils/postgres'
import express from 'express'
import {initEstrus} from '@src/apps/estrus-service/init'
import {firestore} from '@src/utils/firebase'

const main = async () => {
  Vardec.init("./config/config.local.json")

  const dbSql = await pgPool({
    logging: false,
    user: Vardec.getString('postgres.user'),
    password: Vardec.getString('postgres.pass'),
    database: Vardec.getString('postgres.name'),
    host: Vardec.getString('postgres.host'),
    port: Vardec.getNumber('postgres.port'),
    ssl: Vardec.getBoolean('postgres.ssl'),
    max: Vardec.getNumber('postgres.pool'),
  })

  const dbNoSql = firestore('./config/service-account.local.json')

  const coba = await dbNoSql.collection('coba').get()
  console.log(coba)
  const app = express()
  app.use(express.json())
  app.use('/v1', initEstrus(dbSql))

  const server = app.listen(Vardec.getNumber('application.port'))
  console.log(
    Vardec.getString('application.name'),
    ' Started at port ',
    Vardec.getNumber('application.port'),
  )

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.log('HTTP server closed')
    })
  })
}

main()
