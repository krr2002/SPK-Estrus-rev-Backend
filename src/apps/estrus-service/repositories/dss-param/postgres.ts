import {Pool} from 'pg'
import {DSSParamDataType, DSSParamRepository} from '@src/apps/estrus-service/repositories/dss-param/interface'
import { v7 as uuidv7 } from 'uuid'


export class PostgresDSSParamRepository implements DSSParamRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  create = async (name: string) => {
    const q = {
      name: 'dssParamCreate',
      text: `INSERT INTO dss_params (id, name) VALUES ($1::uuid, $2::text)`,
      values: [uuidv7(), name],
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err) {
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
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          deletedAt: item.deleted_at,
        })
      }
      return result
    } catch (err) {
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
          createdAt: res.rows[0].created_at,
          updatedAt: res.rows[0].updated_at,
          deletedAt: res.rows[0].deleted_at,
      }
    } catch (err) {
      throw err
    }
  }
  update = async (id: string, name: string) => {
    const q = {
      name: 'dssParamUpdate',
      text: `UPDATE dss_params SET name = $1::string, updated_at = NOW() WHERE id = $2::uuid AND deleted_at IS NULL`,
      values: [name, id],
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
    } catch (err) {
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
    } catch (err) {
      throw err
    }
  }
}