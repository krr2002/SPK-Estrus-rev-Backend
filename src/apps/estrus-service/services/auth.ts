import {UserDataType, UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {LoginDTO, RegisterDTO} from '@src/apps/estrus-service/controllers/auth/dto'
import {ERR_ACCESS_DENIED, ERR_DUPLICATE, ERR_NO_ROW, RestResponseType} from '@src/utils/response'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Vardec} from '@src/utils/vardec'


export class AuthService {
  private readonly userRepo: UserRepository;

  constructor(ru: UserRepository) {
    this.userRepo = ru
  }

  registerUser = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      const userData = await this.userRepo.getByUsername(param.username)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      const res = await this.userRepo.createUser(param)
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  registerAdmin = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      const userData = await this.userRepo.getByUsername(param.username)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      const res = await this.userRepo.createAdmin(param)
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  registerExpert = async (param: RegisterDTO): Promise<RestResponseType> => {
    try {
      const userData = await this.userRepo.getByUsername(param.username)
      if (userData) throw ERR_DUPLICATE
      param.password = await bcrypt.hash(param.password, 10)
      const res = await this.userRepo.createExpert(param)
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  login = async (param: LoginDTO): Promise<RestResponseType> => {
    try {
      const res = await this.userRepo.getByUsername(param.username)
      if (!res) throw ERR_NO_ROW
      if (!bcrypt.compare(param.password, res.password)) throw ERR_ACCESS_DENIED
      res.tokenReset = ''
      res.password = ''
      const token = jwt.sign(res, Vardec.getString('application.jwtSecret'))
      return {message: 'SUCCESS', data: {token} }
    } catch (err) {
      throw err
    }
  }
}