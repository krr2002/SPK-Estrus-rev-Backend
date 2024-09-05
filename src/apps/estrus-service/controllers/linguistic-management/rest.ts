import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'
import {ParamManagementService} from '@src/apps/estrus-service/services/param-management'
import {LinguisticManagementService} from '@src/apps/estrus-service/services/linguistic-management'

export class RestLangManagementController {
  private readonly langMgmtService: LinguisticManagementService

  constructor(sa: LinguisticManagementService) {
    this.langMgmtService = sa
  }

  create = async (req: Request, res: Response) => {
    const schema = Joi.object({
      paramId: Joi.string().uuid().required(),
      name: Joi.string().min(1).required(),
      min: Joi.number().required(),
    })
    try {
      await schema.validateAsync(req.body)
      const result = await this.langMgmtService.create(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getByParamId = async (req: Request, res: Response) => {
    try {
      const result = await this.langMgmtService.getByParamId(req.params.paramId)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}