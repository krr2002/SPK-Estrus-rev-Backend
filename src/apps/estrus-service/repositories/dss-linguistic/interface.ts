export type DSSLinguisticDataType = {
  id: string
  paramId: string
  name: string
  minValue: number
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}
export type DSSAllDataType = {
  langId: string
  langName: string
  paramId: string
  paramName:string
}
export type UpdateParamType = {
  name: string
  minValue: number
}
export type CreateParamType = UpdateParamType & {
  paramId: string
}

export interface DSSLinguisticRepository {
  create(arg: CreateParamType): Promise<string>
  getAllByParamId(paramId: string): Promise<DSSLinguisticDataType[]>
  getByIds(ids: string[]): Promise<DSSAllDataType[]>
  update(id: string, arg: UpdateParamType): Promise<void>
  delete(id: string): Promise<void>
}