import {Pool} from 'pg'
import { v7 as uuidv7 } from 'uuid'
import {
  CreateParamType,
  DSSAllDataType, DSSLangWithParamDataType,
  DSSLinguisticDataType,
  DSSLinguisticRepository,
  UpdateParamType,
} from './interface'


export class PostgresDSSLinguisticRepository implements DSSLinguisticRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  create = async (arg: CreateParamType) => {
    const q = {
      name: 'dssLinguisticCreate',
      text: `
        INSERT INTO dss_linguistics (id, param_id, name, min_value, max_value)
        VALUES ($1::uuid, $2::uuid, $3::text, $4::float, $5::float)
        RETURNING id
      `,
      values: [uuidv7(), arg.paramId, arg.name, arg.minValue, arg.maxValue],
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
  getAllByParamId = async (paramId: string) => {
    const q = {
      name: 'dssLinguisticGetAllByParamId',
      text: `SELECT * FROM dss_linguistics WHERE param_id = $1::uuid AND deleted_at IS NULL`,
      values: [paramId]
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: DSSLinguisticDataType[] = []
      for (const item of res.rows) {
        result.push({
          id: item.id,
          paramId: item.param_id,
          name: item.name,
          minValue: item.min_value,
          maxValue: item.max_value,
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
  getByIds = async (ids: string[]) => {
    const q = {
      name: 'dssLinguisticGetByIds',
      text: `
        SELECT
          dl.id AS lang_id,
          dl.name AS lang_name,
          dp.id AS param_id,
          dp.name AS param_name
        FROM dss_linguistics dl
        LEFT JOIN dss_params dp ON dp.id = dl.param_id
        WHERE dl.id = ANY($1::uuid[]) AND dl.deleted_at IS NULL
      `,
      values: [ids]
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: DSSAllDataType[] = []
      for (const item of res.rows) {
        result.push({
          langId: item.lang_id,
          langName: item.lang_name,
          paramId: item.param_id,
          paramName: item.param_name,
        })
      }
      return result
    } catch (err: any) {
      throw err
    }
  }
  getAllWithParam = async () => {
    const q = {
      name: 'dssLinguisticGetAllWithParam',
      text: `
        SELECT
          dl.id,
          dl.name,
          dl.param_id,
          dp.name AS param_name,
          dp.type,
          dl.min_value,
          dl.created_at,
          dl.updated_at,
          dl.deleted_at
        FROM dss_linguistics dl
        LEFT JOIN dss_params dp ON dp.id = dl.param_id
        WHERE dl.deleted_at IS NULL AND dp.deleted_at IS NULL
      `,
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: DSSLangWithParamDataType[] = []
      for (const item of res.rows) {
        result.push({
          id: item.id,
          name: item.name,
          paramId: item.param_id,
          paramName: item.param_name,
          type: item.type,
          minValue: item.min_value,
          maxValue: item.max_value,
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
  update = async (langId: string, arg: UpdateParamType) => {
    const q = {
      name: 'dssLinguisticUpdate',
      text: `
        UPDATE dss_linguistics SET
          name = $2::text,
          min_value = $3::float,
          max_value = $4::float,
          updated_at = NOW()
        WHERE id = $1::uuid AND deleted_at IS NULL
      `,
      values: [
        langId,
        arg.name,
        arg.minValue,
        arg.maxValue,
      ]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err: any) {
      throw err
    }
  }
  delete = async (langId: string) => {
    const q = {
      name: 'dssLinguisticDelete',
      text: `UPDATE dss_linguistics SET deleted_at = NOW(), updated_at = NOW() WHERE id = $1::uuid AND deleted_at IS NULL`,
      values: [langId]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err: any) {
      throw err
    }
  }
}