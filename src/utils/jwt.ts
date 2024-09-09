import jwt from 'jsonwebtoken'
import {Vardec} from '@src/utils/vardec'


export const verifyAndDecode = (token: string, prefix = 'Bearer ', suffix?: string) => {
  if (prefix) token = token.replace(prefix, '').replace(prefix.toUpperCase(), '').replace(prefix.toLowerCase(), '')
  if (suffix) token = token.replace(suffix, '').replace(suffix.toUpperCase(), '').replace(suffix.toLowerCase(), '')
  try {
    return jwt.verify(token || '', Vardec.getString('application.jwtSecret')) as any
  } catch (err: any) {
    throw Object.assign(err, {code: 401})
  }
}