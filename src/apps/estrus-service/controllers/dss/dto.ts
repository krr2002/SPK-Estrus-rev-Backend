export type DSSDTO = {
  specimenName: string
  age: number
  conditions: string[]
}

type ParamOptionDataType = {
  id: string
  name: string
  min: number
}

export type DSSParamWithOptionsDTO = {
  id: string
  name: string
  type: 'LINGUISTIC' | 'NUMERIC'
  options: ParamOptionDataType[]
}