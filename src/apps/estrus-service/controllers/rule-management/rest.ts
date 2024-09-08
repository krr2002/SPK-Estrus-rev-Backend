import {RuleManagementService} from '@src/apps/estrus-service/services/rule-management'
import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  linguisticCombo: Joi.array().items(Joi.string().required(), Joi.string().required()),
  operator: Joi.string().regex(/^(AND|OR)$/).required(),
  result: Joi.string().required(),
})

export class RestRuleManagementController {
  private readonly rulMgmtService: RuleManagementService

  constructor(srm: RuleManagementService) {
    this.rulMgmtService = srm
  }

  create = async (req: Request, res: Response) => {
    try {
      await schema.validateAsync(req.body)
      const result = await this.rulMgmtService.create(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.rulMgmtService.getAll()
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.rulMgmtService.getById(req.params.id)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      await schema.validateAsync(req.body)
      const result = await this.rulMgmtService.update(req.params.id, req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.rulMgmtService.delete(req.params.id)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}