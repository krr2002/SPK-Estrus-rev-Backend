import {Pool} from 'pg'
import {DSSParamDataType, DSSParamRepository, UpdateDataType} from './interface'
import { v7 as uuidv7 } from 'uuid'


export class PostgresDSSParamRepository implements DSSParamRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  create = async (arg: UpdateDataType) => {
    const q = {
      name: 'dssParamCreate',
      text: `
        INSERT INTO dss_params (id, name, type, note)
        VALUES ($1::uuid, $2::text, $3::text, $4::text)
        RETURNING id
      `,
      values: [uuidv7(), arg.name, arg.type, arg.note],
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      return res.rows[0].id
    } catch (err: any) {
      throw err
    }
  }
  getAll = async () => {
    const q = {
      name: 'dssParamGetAll',
      text: `SELECT * FROM dss_params WHERE deleted_at IS NULL`,
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: DSSParamDataType[] = []
      for (const item of res.rows) {
        result.push({
          id: item.id,
          name: item.name,
          type: item.type,
          note: item.note,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          deletedAt: item.deleted_at,
        })
      }
      return result
    } catch (err: any) {
      throw err
    }
  }
  getById = async (id: string) => {
    const q = {
      name: 'dssParamGetById',
      text: `SELECT * FROM dss_params WHERE id = $1::uuid AND deleted_at IS NULL`,
      values: [id],
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      if (!res.rows[0]) return null
      return {
          id: res.rows[0].id,
          name: res.rows[0].name,
          type: res.rows[0].type,
          note: res.rows[0].note,
          createdAt: res.rows[0].created_at,
          updatedAt: res.rows[0].updated_at,
          deletedAt: res.rows[0].deleted_at,
      }
    } catch (err: any) {
      throw err
    }
  }
  update = async (id: string, arg: UpdateDataType) => {
    const q = {
      name: 'dssParamUpdate',
      text: `
        UPDATE dss_params SET
          name = $2::text,
          type = $3::text,
          note = $4::text,
          updated_at = NOW()
        WHERE id = $1::uuid AND deleted_at IS NULL
      `,
      values: [id, arg.name, arg.type, arg.note],
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
    } catch (err: any) {
      throw err
    }
  }
  delete = async (id: string) => {
    const q = {
      name: 'dssParamDelete',
      text: `UPDATE dss_params SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1::uuid AND deleted_at IS NULL`,
      values: [id],
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
    } catch (err: any) {
      throw err
    }
  }
}