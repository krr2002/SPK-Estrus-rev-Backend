export type UpdateDTO = {
  name: string
  min: number
}
export type CreateDTO = UpdateDTO & {
  paramId: string
}
export type LangResponseDTO = {
  id: string
  paramId: string
  name: string
  min: number
}