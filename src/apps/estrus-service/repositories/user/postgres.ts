import {
  CreateParamType,
  ResetPasswordParamType,
  UserDataType,
  UserGetAllNonAdminType,
  UserRepository,
} from './interface'
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
    } catch (err: any) {
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
    } catch (err: any) {
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
    } catch (err: any) {
      throw err
    }
  }
  resetPassword = async (arg: ResetPasswordParamType) => {
    const q = {
      name: 'userResetPassword',
      text: `
        UPDATE users SET 
          password = $2::text, 
          token_reset = $3::text, 
          updated_at = NOW()
        WHERE token_reset = $1::text AND deleted_at IS NULL
      `,
      values: [arg.tokenReset, arg.password, uuidv7()]
    }
    try {
      const client = await this.pool.connect()
      await client.query(q)
      client.release()
    } catch (err: any) {
      throw err
    }
  }
  getById = async (id: string): Promise<UserDataType|null> => {
    const q = {
      name: 'userGetById',
      text: `SELECT * FROM users WHERE id = $1::uuid AND deleted_at IS NULL`,
      values: [id],
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
    } catch (err: any) {
      throw err
    }
  }
  getAllNonAdmin = async (): Promise<UserGetAllNonAdminType[]> => {
    const q = {
      name: 'userGetAllNonAdmin',
      text: `
        SELECT
          u.id AS id,
          u.full_name,
          r.name AS role_name
        FROM users u
        LEFT JOIN roles r ON r.id = u.role_id
        WHERE role_id != '08eaee34-cc4d-4aad-b95a-7e0e077efb34' AND u.deleted_at IS NULL`,
    }
    try {
      const client = await this.pool.connect()
      const res = await client.query(q)
      client.release()
      const result: UserGetAllNonAdminType[] = []
      for (const user of res.rows) {
        result.push({
          id: user.id,
          roleName: user.role_name,
          fullName: user.full_name,
        })
      }
      return result
    } catch (err: any) {
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
    } catch (err: any) {
      throw err
    }
  }
  getByPhone = async (phone: string): Promise<UserDataType|null> => {
    const q = {
      name: 'userGetByPhone',
      text: `SELECT *
             FROM users
             WHERE phone = $1::text AND deleted_at IS NULL`,
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
    } catch (err: any) {
      throw err
    }
  }
  update = async (id: string, arg: CreateParamType) => {
    const q = {
      name: 'userUpdate',
      text: `
        UPDATE users
        SET ( 
          nik $1::text,
          full_name $2::text,
          country $3::text,
          province $4::text,
          city $5::text,
          district $6::text,
          subdistrict $7::text,
          address $8::text,
          updated_at = NOW()
        )
        WHERE id = $9::uuid AND deleted_at IS NULL
      `,
      values: [
        arg.nik.toUpperCase(),
        arg.fullName.toUpperCase(),
        arg.country.toUpperCase(),
        arg.province.toUpperCase(),
        arg.city.toUpperCase(),
        arg.district.toUpperCase(),
        arg.subdistrict.toUpperCase(),
        arg.address.toUpperCase(),
        id,
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
  delete = async (id: string) => {
    const q = {
      name: 'userDelete',
      text: `
        UPDATE users
        SET (
          deleted_at = NOW(),
          updated_at = NOW(),
        )
        WHERE id = $1::uuid AND deleted_at IS NULL
      `,
      values: [id]
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