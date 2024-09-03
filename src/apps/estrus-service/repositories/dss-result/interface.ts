export type CreateParamType = {
  name: string
  ruleSets: {
    key: string
    value: string
  }[]
  result: string
}

export type DSSResultDataType = CreateParamType & {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface DSSResultRepository {
  create(arg: CreateParamType): Promise<DSSResultDataType>
  getAll(): Promise<DSSResultDataType[]>
  getById(id: string): Promise<DSSResultDataType|null>
}