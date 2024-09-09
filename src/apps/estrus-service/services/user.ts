import {UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {ERR_NO_ROW, RestResponseType} from '@src/utils/response'
import {UpdateDTO} from '@src/apps/estrus-service/controllers/user/dto'


export class UserService {
  private readonly userRepo: UserRepository

  constructor(ru: UserRepository) {
    this.userRepo = ru
  }

  getById = async (id: string): Promise<RestResponseType> => {
    try {
      let res = await this.userRepo.getById(id)
      if (!res) throw ERR_NO_ROW
      return {message: 'FETCHED', data: {
        nik: res.nik,
        roleId: res.roleId,
        fullName: res.fullName,
        email: res.email,
        phone: res.phone,
        district: res.district,
        subdistrict: res.subdistrict,
        address: res.address,
      }}
    } catch (err) {
      throw err
    }
  }
  getAllNonAdmin = async (): Promise<RestResponseType> => {
    try {
      let userData = await this.userRepo.getAllNonAdmin()
      return {message: 'CREATED', data: userData}
    } catch (err) {
      throw err
    }
  }
  update = async (id: string, param: UpdateDTO): Promise<RestResponseType> => {
    try {
      await this.userRepo.update(id, {
        ...param,
        city: "KABUPTEN MERAUKE",
        province: "PAPUA SELATAN",
        country: "INDONESIA",
      })
      return {message: 'UPDATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  delete = async (id: string): Promise<RestResponseType> => {
    try {
      await this.userRepo.delete(id)
      return {message: 'DELETED', data: {}}
    } catch (err) {
      throw err
    }
  }
}