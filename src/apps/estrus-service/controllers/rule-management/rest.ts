import {RuleManagementService} from '@src/apps/estrus-service/services/rule-management'
import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'


export class RestRuleManagementController {
  private readonly rulMgmtService: RuleManagementService

  constructor(srm: RuleManagementService) {
    this.rulMgmtService = srm
  }

  create = async (req: Request, res: Response) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      linguisticCombo: Joi.array().items(Joi.string().required(), Joi.string().required()),
      operator: Joi.string().regex(/^(AND|OR)$/i).required(),
      result: Joi.string().required(),
    })
    try {
      await schema.validateAsync(req.body)
      const result = await this.rulMgmtService.create(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}