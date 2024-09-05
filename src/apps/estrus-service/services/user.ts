import {UserRepository} from '@src/apps/estrus-service/repositories/user/interface'
import {RestResponseType} from '@src/utils/response'
import {RoleRepository} from '@src/apps/estrus-service/repositories/role/interface'


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
}