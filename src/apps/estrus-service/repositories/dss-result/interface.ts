export type CreateParamType = {
  name: string
  age: number
  condition: object
  dssResult: string
  createdBy: string
}

export type DSSResultDataType = CreateParamType & {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface DSSResultRepository {
  create(arg: CreateParamType): Promise<void>
  getAll(): Promise<DSSResultDataType[]>
  getByCreator(creatorId: string): Promise<DSSResultDataType[]>
  getById(id: string): Promise<DSSResultDataType|null>
  delete(id: string): Promise<void>
}