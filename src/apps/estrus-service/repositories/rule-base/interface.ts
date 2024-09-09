export type CreateParamType = {
  name: string
  linguisticCombo: string[]
  operator: 'AND'|'OR'
  result: string
}

export type RuleBaseDataType = CreateParamType & {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string|null
}

export interface RuleBaseRepository {
  create(arg: CreateParamType): Promise<void>
  getAll(): Promise<RuleBaseDataType[]>
  getByAndLinguisticCombo(combo: string[]): Promise<RuleBaseDataType|null>
  getById(id: string): Promise<RuleBaseDataType|null>
  update(id: string, arg: CreateParamType): Promise<void>
  delete(id: string): Promise<void>
}