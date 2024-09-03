import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'
import {DSSService} from '@src/apps/estrus-service/services/dss'


export class RestDSSController {
  private readonly dssService: DSSService

  constructor(sd: DSSService) {
    this.dssService = sd
  }

  run = async (req: Request, res: Response) => {
    const schema = Joi.object({
      specimenName: Joi.string().min(1).required(),
      linguisticCombo: Joi.array().items(Joi.string().required(), Joi.string().required()),
    })
    try {
      await schema.validateAsync(req.body)
      const result = await this.dssService.run(req.body)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}