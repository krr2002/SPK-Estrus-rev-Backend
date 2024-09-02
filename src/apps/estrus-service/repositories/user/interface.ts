export type CreateParamType = {
  nik: string
  fullName: string
  email: string
  phone: string
  country: string
  province: string
  city: string
  district: string
  subdistrict: string
  address: string
  password: string
}

export type UserDataType = CreateParamType & {
  id: string
  roleId: string
  tokenReset: string
  lastAccessed: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface UserRepository {
  createUser(arg: CreateParamType): Promise<void>
  createAdmin(arg: CreateParamType): Promise<void>
  createExpert(arg: CreateParamType): Promise<void>
  getByEmail(username: string): Promise<UserDataType|null>
  getByPhone(username: string): Promise<UserDataType|null>
}