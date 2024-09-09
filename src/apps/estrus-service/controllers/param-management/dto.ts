export type ParamRequestDTO = {
  name: string
  type: 'LINGUISTIC'|'NUMERIC'
  note?: string
}
export type ParamResultDTO = ParamRequestDTO & {
  id: string
}