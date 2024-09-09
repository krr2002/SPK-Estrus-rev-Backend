export type CreateRuleDTO = {
  name: string
  linguisticCombo: string[]
  operator: 'AND'|'OR'
  result: string
}

export type ResponseDTO = CreateRuleDTO & {
  id: string
}