import {AuthService} from '@src/apps/estrus-service/services/auth'
import {Request, Response} from 'express'
import Joi from 'joi'
import {RegisterDTO} from '@src/apps/estrus-service/controllers/auth/dto'
import {resErr} from '@src/utils/response'

const registerSchema = Joi.object<RegisterDTO>({
  username: Joi.string().alphanum().min(5).required(),
  password: Joi.string().min(8).max(32).required(),
  fullName: Joi.string().min(1).required(),
  confirmPassword: Joi.string().min(8).required(),
})

export class RestAuthController {
  private readonly authService: AuthService

  constructor(sa: AuthService) {
    this.authService = sa
  }

  registerUser = async (req: Request, res: Response) => {
    try {
      await registerSchema.validateAsync(req.body)
      if (req.body.password !== req.body.confirmPassword) throw "password mismatch"
      const result = await this.authService.registerUser(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  registerAdmin = async (req: Request, res: Response) => {
    try {
      await registerSchema.validateAsync(req.body)
      if (req.body.password !== req.body.confirmPassword) throw "password mismatch"
      const result = await this.authService.registerAdmin(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  registerExpert = async (req: Request, res: Response) => {
    try {
      await registerSchema.validateAsync(req.body)
      if (req.body.password !== req.body.confirmPassword) throw "password mismatch"
      const result = await this.authService.registerExpert(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}