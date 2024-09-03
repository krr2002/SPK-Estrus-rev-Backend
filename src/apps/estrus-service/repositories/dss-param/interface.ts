export type DSSParamDataType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface DSSParamRepository {
  create(name: string): Promise<void>
  getAll(): Promise<DSSParamDataType[]>
  getById(id: string): Promise<DSSParamDataType|null>
}