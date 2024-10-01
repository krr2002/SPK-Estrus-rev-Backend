import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'
import {DSSService} from '@src/apps/estrus-service/services/dss'
import {verifyAndDecode} from '@src/utils/jwt'
import {stripDash} from '@src/utils/uuid'


export class RestDSSController {
  private readonly dssService: DSSService

  constructor(sd: DSSService) {
    this.dssService = sd
  }

  getAllParam = async (req: Request, res: Response) => {
    try {
      const result = await this.dssService.getAllParam()
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  run = async (req: Request, res: Response) => {
    const schema = Joi.object({
      specimenName: Joi.string().min(1).required(),
      age: Joi.number().required(),
      conditions: Joi.array().items(Joi.string().required(), Joi.string().required()),
    }).unknown()
    try {
      await schema.validateAsync(req.body)
      const token = verifyAndDecode(req.header('authorization') as string)
      const result = await this.dssService.run({...req.body, creatorId: stripDash(token.id)})
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}