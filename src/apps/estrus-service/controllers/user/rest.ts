import {Request, Response} from 'express'
import {resErr} from '@src/utils/response'
import {UserService} from '@src/apps/estrus-service/services/user'


export class RestUserController {
  private readonly userService: UserService

  constructor(su: UserService) {
    this.userService = su
  }

  getAllNonAdmin = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAllNonAdmin()
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}