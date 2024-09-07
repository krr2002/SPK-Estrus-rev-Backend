export type UpdateDataType = {
  name: string
  type: 'LINGUISTIC'|'NUMERIC'
  note?: string
}
export type DSSParamDataType = {
  id: string
  name: string
  type: 'LINGUISTIC'|'NUMERIC'
  note?: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface DSSParamRepository {
  create(arg: UpdateDataType): Promise<string>
  getAll(): Promise<DSSParamDataType[]>
  getById(id: string): Promise<DSSParamDataType|null>
  update(id: string, arg: UpdateDataType): Promise<void>
  delete(id: string): Promise<void>
}