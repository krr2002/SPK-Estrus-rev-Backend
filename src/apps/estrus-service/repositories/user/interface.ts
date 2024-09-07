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
export type UserGetAllNonAdminType = {
  id: string
  fullName: string
  roleName: string
}

export interface UserRepository {
  createUser(arg: CreateParamType): Promise<void>
  createAdmin(arg: CreateParamType): Promise<void>
  createExpert(arg: CreateParamType): Promise<void>
  getById(id: string): Promise<UserDataType|null>
  getByEmail(username: string): Promise<UserDataType|null>
  getByPhone(username: string): Promise<UserDataType|null>
  getAllNonAdmin(): Promise<UserGetAllNonAdminType[]>
  update(id: string, arg: UpdateParamType): Promise<void>
  delete(id: string): Promise<void>
}