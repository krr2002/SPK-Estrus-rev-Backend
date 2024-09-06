import {Request, Response} from 'express'
import {resErr} from '@src/utils/response'
import {UserService} from '@src/apps/estrus-service/services/user'
import Joi from 'joi'
import {UpdateDTO} from './dto'


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
  update = async (req: Request, res: Response) => {
    const schema = Joi.object<UpdateDTO>({
      nik: Joi.string().regex(/^\d+$/).length(16).required(),
      fullName: Joi.string().min(1).required(),
      district: Joi.string().min(1).required(),
      subdistrict: Joi.string().min(1).required(),
      address: Joi.string(),
    })
    try {
      await schema.validateAsync(req.body)
      const result = await this.userService.update(req.params.userId, req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.delete(req.params.userId)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}