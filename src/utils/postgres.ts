import {Client, ClientConfig, Pool, PoolConfig} from 'pg'

type ExtendedClientConfig = ClientConfig & {
  logging: boolean
}

type ExtendedPoolConfig = PoolConfig & {
  logging: boolean
}

export const pgClient = async (cfg: ExtendedClientConfig) => {
  const conn = new Client(cfg)
  try {
    await conn.connect()
    console.log(`Connected to PG ${cfg.database} at ${cfg.host}:${cfg.port}`)
    await conn.end()
    return conn
  } catch (err) {
    throw err
  }
}

export const pgPool = async (cfg: ExtendedPoolConfig) => {
  const pool = new Pool(cfg)
  try {
    const client = await pool.connect()
    console.log(`Connected to PG ${cfg.database} at ${cfg.host}:${cfg.port}`)
    client.release()
    return pool
  } catch (err) {
    throw err
  }
}
