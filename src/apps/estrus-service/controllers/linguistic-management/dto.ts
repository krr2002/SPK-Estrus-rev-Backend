export type UpdateDTO = {
  name: string
  min: number
}
export type CreateDTO = UpdateDTO & {
  paramId: string
}