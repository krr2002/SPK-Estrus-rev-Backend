import {UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {LoginDTO, RegisterDTO, ResetPassDTO} from '@src/apps/estrus-service/controllers/auth/dto'
import {ERR_ACCESS_DENIED, ERR_DUPLICATE, ERR_NO_ROW, isGenericError, RestResponseType} from '@src/utils/response'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Vardec} from '@src/utils/vardec'
import {RoleRepository} from '@src/apps/estrus-service/repositories/role/interface'
import dayjs, {Dayjs} from 'dayjs'
import axios from 'axios'
import fs from 'node:fs'
import * as handlebars from 'handlebars'
import {Logger} from '@src/utils/logger'


export class AuthService {
  private readonly userRepo: UserRepository
  private readonly roleRepo: RoleRepository

  constructor(ru: UserRepository, rr: RoleRepository) {
    this.userRepo = ru
    this.roleRepo = rr
  }

  registerUser = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      let userData = await this.userRepo.getByEmail(param.email)
      if (!userData) userData = await this.userRepo.getByPhone(param.phone)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      await this.userRepo.createUser({
        ...param,
        city: "KABUPTEN MERAUKE",
        province: "PAPUA SELATAN",
        country: "INDONESIA",
      })
      return {message: 'CREATED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  registerAdmin = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      let userData = await this.userRepo.getByEmail(param.email)
      if (!userData) userData = await this.userRepo.getByPhone(param.phone)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      await this.userRepo.createAdmin({
        ...param,
        city: "KABUPTEN MERAUKE",
        province: "PAPUA SELATAN",
        country: "INDONESIA",
      })
      return {message: 'CREATED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  registerExpert = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      let userData = await this.userRepo.getByEmail(param.email)
      if (!userData) userData = await this.userRepo.getByPhone(param.phone)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      await this.userRepo.createExpert({
        ...param,
        city: "KABUPTEN MERAUKE",
        province: "PAPUA SELATAN",
        country: "INDONESIA",
      })
      return {message: 'CREATED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  login = async (param: LoginDTO): Promise<RestResponseType> => {
    try {
      let res = await this.userRepo.getByEmail(param.credential)
      if (!res) res = await this.userRepo.getByPhone(param.credential)
      if (!res) throw ERR_NO_ROW
      const isMatched = await bcrypt.compare(param.password, res.password)
      if (!isMatched) throw ERR_ACCESS_DENIED
      const roleData = await this.roleRepo.getById(res.roleId)
      if (!roleData) throw ERR_ACCESS_DENIED
      const paylod = {
        ...res,
        tokenReset: undefined,
        password: undefined,
        roleName: roleData.name,
        exp: dayjs().add(1, 'hour').unix()
      }
      const token = jwt.sign(paylod, Vardec.getString('application.jwtSecret'))
      return {message: 'SUCCESS', data: {token} }
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  requestRecovery = async (email: string) => {
    try {
      const userData = await this.userRepo.getByEmail(email)
      if (!userData) throw ERR_NO_ROW
      const htmlData = fs.readFileSync('./resources/password-reset.html', 'utf8')
      const template = handlebars.compile(htmlData)
      const httpRes = await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender: {
          name: Vardec.getString('breevo.sender.name'),
          email: Vardec.getString('breevo.sender.email'),
        },
        to: [{
          name: userData.fullName,
          email: userData.email,
        }],
        subject: 'Password Reset',
        htmlContent: template({recoveryCode: userData.tokenReset}),
      }, {
        headers: {'api-key': Vardec.getString('breevo.apiKey')},
      })
      if (httpRes.status >= 200 && httpRes.status < 300) return {message: 'SUCCESS', data: {}}
      Logger.error(httpRes.data)
      throw Error('Failed to send email')
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  resetPassword = async (param: ResetPassDTO) => {
    try {
      param.password = await bcrypt.hash(param.password, 10)
      await this.userRepo.resetPassword({tokenReset: param.code, password: param.password})
      return {message: 'SUCCESS', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
}