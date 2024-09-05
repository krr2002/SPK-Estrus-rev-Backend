import {UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {LoginDTO, RegisterDTO} from '@src/apps/estrus-service/controllers/auth/dto'
import {ERR_ACCESS_DENIED, ERR_DUPLICATE, ERR_NO_ROW, RestResponseType} from '@src/utils/response'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Vardec} from '@src/utils/vardec'
import {RoleRepository} from '@src/apps/estrus-service/repositories/role/interface'


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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      throw err
    }
  }
  login = async (param: LoginDTO): Promise<RestResponseType> => {
    try {
      let res = await this.userRepo.getByEmail(param.credential)
      if (!res) res = await this.userRepo.getByPhone(param.credential)
      if (!res) throw ERR_NO_ROW
      if (!bcrypt.compare(param.password, res.password)) throw ERR_ACCESS_DENIED
      const roleData = await this.roleRepo.getById(res.roleId)
      if (!roleData) throw ERR_ACCESS_DENIED
      res.tokenReset = ''
      res.password = ''
      const token = jwt.sign({...res, roleName: roleData.name}, Vardec.getString('application.jwtSecret'))
      return {message: 'SUCCESS', data: {token} }
    } catch (err) {
      throw err
    }
  }
}