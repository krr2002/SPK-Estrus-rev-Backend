import {DSSLinguisticDataType} from '@src/apps/estrus-service/repositories/dss-linguistic/interface'


export type CreateParamType = {
  linguisticCombo: string[]
  operator: 'AND'|'OR'
  result: string
}

export type RuleBaseDataType = CreateParamType & {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface RuleBaseRepository {
  create(arg: CreateParamType): Promise<void>
  getAll(paramId: string): Promise<DSSLinguisticDataType[]>
  getByLinguisticCombo(arg: CreateParamType): Promise<string|null>
}