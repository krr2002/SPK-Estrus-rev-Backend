export type RestResponseType = {
  message: string
  data: object
  count?: number
}

export const ERR_NO_ROW = {message: "data not found", code: 400, name: "NO_ROW"}
export const ERR_DUPLICATE = {message: "data exist", code: 400, name: "DUPLICATE"}
export const ERR_ACCESS_DENIED = {message: "access denied", code: 401, name: "ACCESS_DENIED"}

export const resErr = (err: any): RestResponseType & {code: number} => {
  let code = 400
  let name = 'BAD_REQUEST'
  if (typeof err !== 'string') {
    code = 500
    if (typeof err.code === 'number') code = err.code
    if (typeof err.name === 'string') name = err.name
    err = err.message
  }
  name = name.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
  return {
    code,
    data: [err],
    message: name,
  }
}