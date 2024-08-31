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
  create(arg: CreateParamType): Promise<void>
}