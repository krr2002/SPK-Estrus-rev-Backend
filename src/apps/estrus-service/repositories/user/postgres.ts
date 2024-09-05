import {CreateParamType, UserDataType, UserRepository} from './interface'
import {Pool} from 'pg'
import { v7 as uuidv7 } from 'uuid'


export class PostgresUserRepository implements UserRepository {
  private readonly pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async createUser(arg: CreateParamType): Promise<void> {
    const q = {
      name: 'userCreateUser',
      text: `
        INSERT INTO users(
          id,
          role_id,
          nik,
          full_name,
          email,
          phone,
          country,
          province,
          city,
          district,
          subdistrict,
          address,
          password
        )
        VALUES (
          $1::uuid,
          '3b1898e7-83f6-475f-a439-8b5c5ccadafd',
          $2::text,
          $3::text,
          $4::text,
          $5::text,
          $6::text,
          $7::text,
          $8::text,
          $9::text,
          $10::text,
          $11::text,
          $12::text
        )
      `,
      values: [
        uuidv7(),
        arg.nik.toUpperCase(),
        arg.fullName.toUpperCase(),
        arg.email.toLowerCase(),
        arg.phone,
        arg.country.toUpperCase(),
        arg.province.toUpperCase(),
        arg.city.toUpperCase(),
        arg.district.toUpperCase(),
        arg.subdistrict.toUpperCase(),
        arg.address.toUpperCase(),
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
      text: `
        INSERT INTO users(
          id,
          role_id,
          nik,
          full_name,
          email,
          phone,
          country,
          province,
          city,
          district,
          subdistrict,
          address,
          password
        )
        VALUES (
          $1::uuid,
          '08eaee34-cc4d-4aad-b95a-7e0e077efb34',
          $2::text,
          $3::text,
          $4::text,
          $5::text,
          $6::text,
          $7::text,
          $8::text,
          $9::text,
          $10::text,
          $11::text,
          $12::text
        )
      `,
      values: [
        uuidv7(),
        arg.nik.toUpperCase(),
        arg.fullName.toUpperCase(),
        arg.email.toLowerCase(),
        arg.phone,
        arg.country.toUpperCase(),
        arg.province.toUpperCase(),
        arg.city.toUpperCase(),
        arg.district.toUpperCase(),
        arg.subdistrict.toUpperCase(),
        arg.address.toUpperCase(),
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
        INSERT INTO users(
          id,
          role_id,
          nik,
          full_name,
          email,
          phone,
          country,
          province,
          city,
          district,
          subdistrict,
          address,
          password
        )
        VALUES (
          $1::uuid,
          'b00b1f24-4d8f-43a3-8059-27ee48ac76f0',
          $2::text,
          $3::text,
          $4::text,
          $5::text,
          $6::text,
          $7::text,
          $8::text,
          $9::text,
          $10::text,
          $11::text,
          $12::text
        )
      `,
      values: [
        uuidv7(),
        arg.nik.toUpperCase(),
        arg.fullName.toUpperCase(),
        arg.email.toLowerCase(),
        arg.phone,
        arg.country.toUpperCase(),
        arg.province.toUpperCase(),
        arg.city.toUpperCase(),
        arg.district.toUpperCase(),
        arg.subdistrict.toUpperCase(),
        arg.address.toUpperCase(),
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
  getAllNonAdmin = async (): Promise<UserDataType[]> => {
    const q = {
      name: 'userGetAllNonAdmin',
      text: `SELECT * FROM users WHERE role_id != '08eaee34-cc4d-4aad-b95a-7e0e077efb34' AND deleted_at IS NULL`,
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: UserDataType[] = []
      for (const user of res.rows) {
        result.push({
          id: user.id,
          roleId: user.role_id,
          nik: user.nik,
          fullName: user.full_name,
          email: user.email,
          phone: user.phone,
          country: user.country,
          province: user.province,
          city: user.city,
          district: user.district,
          subdistrict: user.subdistrict,
          address: user.address,
          password: user.password,
          tokenReset: user.token_reset,
          lastAccessed: user.last_accessed,
          createdAt: user.created_at,
          updatedAt: user.created_at,
          deletedAt: user.deleted_at,
        })
      }
      return result
    } catch (err) {
      throw err
    }
  }
  getByEmail = async (email: string): Promise<UserDataType|null> => {
    const q = {
      name: 'userGetByEmail',
      text: `SELECT * FROM users WHERE email = $1::text AND deleted_at IS NULL`,
      values: [email.toLowerCase()]
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      if (!res.rows[0]) return null
      return {
        id: res.rows[0].id,
        roleId: res.rows[0].role_id,
        nik: res.rows[0].nik,
        fullName: res.rows[0].full_name,
        email: res.rows[0].email,
        phone: res.rows[0].phone,
        country: res.rows[0].country,
        province: res.rows[0].province,
        city: res.rows[0].city,
        district: res.rows[0].district,
        subdistrict: res.rows[0].subdistrict,
        address: res.rows[0].address,
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
  getByPhone = async (phone: string): Promise<UserDataType|null> => {
    const q = {
      name: 'userGetByPhone',
      text: `SELECT * FROM users WHERE phone = $1::text AND deleted_at IS NULL`,
      values: [phone]
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      if (!res.rows[0]) return null
      return {
        id: res.rows[0].id,
        roleId: res.rows[0].role_id,
        nik: res.rows[0].nik,
        fullName: res.rows[0].full_name,
        email: res.rows[0].email,
        phone: res.rows[0].phone,
        country: res.rows[0].country,
        province: res.rows[0].province,
        city: res.rows[0].city,
        district: res.rows[0].district,
        subdistrict: res.rows[0].subdistrict,
        address: res.rows[0].address,
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