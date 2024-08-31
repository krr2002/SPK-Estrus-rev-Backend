export type CreateParamType = {
  username: string
  fullName: string
  password: string
}

export type UserDataType = {
  id: string
  roleId: string
  username: string
  fullName: string
  password: string
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
  getByUsername(username: string): Promise<UserDataType|null>
}