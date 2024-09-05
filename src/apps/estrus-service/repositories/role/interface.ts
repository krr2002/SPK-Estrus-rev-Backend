export type RoleDataType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface RoleRepository {
  getById(id: string): Promise<RoleDataType|null>
}