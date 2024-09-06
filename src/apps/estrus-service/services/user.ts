import {UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {RestResponseType} from '@src/utils/response'
import {RoleRepository} from '@src/apps/estrus-service/repositories/role/interface'
import {UpdateDTO} from '@src/apps/estrus-service/controllers/user/dto'


export class UserService {
  private readonly userRepo: UserRepository

  constructor(ru: UserRepository) {
    this.userRepo = ru
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