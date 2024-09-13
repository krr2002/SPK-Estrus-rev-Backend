export type UpdateDTO = {
  name: string
  min: number
  max: number
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