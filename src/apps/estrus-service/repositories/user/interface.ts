export type UpdateParamType = {
  nik: string
  fullName: string
  country: string
  province: string
  city: string
  district: string
  subdistrict: string
  address: string
}

export type CreateParamType = UpdateParamType & {
  email: string
  phone: string
  password: string
}

export type UserDataType = CreateParamType & {
  id: string
  roleId: string
  tokenReset: string
  lastAccessed: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface UserRepository {
  createUser(arg: CreateParamType): Promise<void>
  createAdmin(arg: CreateParamType): Promise<void>
  createExpert(arg: CreateParamType): Promise<void>
  getAllNonAdmin(): Promise<UserDataType[]>
  getByEmail(username: string): Promise<UserDataType|null>
  getByPhone(username: string): Promise<UserDataType|null>
  update(id: string, arg: UpdateParamType): Promise<void>
  delete(id: string): Promise<void>
}