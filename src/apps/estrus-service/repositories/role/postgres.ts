import {RoleRepository} from './interface'
import {Pool} from 'pg'


export class PostgresRoleRepository implements RoleRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getById(id: string) {
    const q = {
      name: 'roleGetById',
      text: `SELECT * FROM roles WHERE id = $1::uuid AND deleted_at IS NULL`,
      values: [id]
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
    } catch (err: any) {
      throw err
    }
  }
}