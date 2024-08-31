import {CreateParamType, UserDataType, UserRepository} from './interface'
import {Pool} from 'pg'
import { v4 as uuidv4 } from 'uuid'


export class PostgresUserRepository implements UserRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async createUser(arg: CreateParamType): Promise<void> {
    const q = {
      name: 'userCreateUser',
      text: `INSERT INTO users(id, role_id, username, full_name, password)
            VALUES ($1::uuid, '3b1898e7-83f6-475f-a439-8b5c5ccadafd', $2::text, $3::text, $4::text)`,
      values: [
        uuidv4(),
        arg.username,
        arg.fullName,
        arg.password,
      ]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err) {
      throw err
    }
  }
  async createAdmin(arg: CreateParamType): Promise<void> {
    const q = {
      name: 'userCreateAdmin',
      text: `INSERT INTO users(id, role_id, username, full_name, password)
            VALUES ($1::uuid, '08eaee34-cc4d-4aad-b95a-7e0e077efb34', $2::text, $3::text, $4::text)`,
      values: [
        uuidv4(),
        arg.username,
        arg.fullName,
        arg.password,
      ]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err) {
      throw err
    }
  }
  async createExpert(arg: CreateParamType): Promise<void> {
    const q = {
      name: 'userCreateExpert',
      text: `
        INSERT INTO users(id, role_id, username, full_name, password)
        VALUES ($1::uuid, 'b00b1f24-4d8f-43a3-8059-27ee48ac76f0', $2::text, $3::text, $4::text)
      `,
      values: [
        uuidv4(),
        arg.username,
        arg.fullName,
        arg.password,
      ]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err) {
      throw err
    }
  }
  getByUsername = async (username: string): Promise<UserDataType|null> => {
    const q = {
      name: 'userGetByUsername',
      text: `
        SELECT id, role_id, username, full_name, password, token_reset, last_accessed, created_at, updated_at, deleted_at
        FROM users WHERE username ILIKE $1::text AND deleted_at IS NULL
      `,
      values: [username]
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      if (!res.rows[0]) return null
      return {
        id: res.rows[0].name,
        roleId: res.rows[0].role_id,
        username: res.rows[0].username,
        fullName: res.rows[0].full_name,
        password: res.rows[0].password,
        tokenReset: res.rows[0].token_reset,
        lastAccessed: res.rows[0].last_accessed,
        createdAt: res.rows[0].created_at,
        updatedAt: res.rows[0].created_at,
        deletedAt: res.rows[0].deleted_at,
      }
    } catch (err) {
      throw err
    }
  }
}