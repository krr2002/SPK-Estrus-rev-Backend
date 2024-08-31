export type DSSLinguisticDataType = {
  id: string
  paramId: string
  name: string
  minValue: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type CreateParamType = {
  paramId: string
  name: string
  minValue: number
}

export interface DSSLinguisticRepository {
  create(arg: CreateParamType): Promise<void>
  getAllByParamId(paramId: string): Promise<DSSLinguisticDataType[]>
}