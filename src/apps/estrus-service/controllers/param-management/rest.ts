import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'
import {ParamManagementService} from '@src/apps/estrus-service/services/param-management'

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  type: Joi.string().pattern(/^(LINGUISTIC|NUMERIC)$/).required(),
  note: Joi.string().allow(''),
})

export class RestParamManagementController {
  private readonly paramMgmtService: ParamManagementService

  constructor(sa: ParamManagementService) {
    this.paramMgmtService = sa
  }

  create = async (req: Request, res: Response) => {
    try {
      await schema.validateAsync(req.body)
      const result = await this.paramMgmtService.create(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.paramMgmtService.getById(req.params.paramId)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.paramMgmtService.getAll()
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      await schema.validateAsync(req.body)
      const result = await this.paramMgmtService.update(req.params.paramId, req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.paramMgmtService.delete(req.params.paramId)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}