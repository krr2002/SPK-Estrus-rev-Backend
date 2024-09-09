import {RuleManagementService} from '@src/apps/estrus-service/services/rule-management'
import {Request, Response} from 'express'
import Joi from 'joi'
import {resErr} from '@src/utils/response'
import {ResultHistoryService} from '@src/apps/estrus-service/services/result-history'
import jwt from 'jsonwebtoken'
import {Vardec} from '@src/utils/vardec'
import {verifyAndDecode} from '@src/utils/jwt'
import {stripDash} from '@src/utils/uuid'


export class RestResultHistoryController {
  private readonly resHistoryService: ResultHistoryService

  constructor(srh: ResultHistoryService) {
    this.resHistoryService = srh
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.resHistoryService.getAll()
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.resHistoryService.getById(req.params.id)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  getByCreator = async (req: Request, res: Response) => {
    try {
      const token = verifyAndDecode(req.header('authorization') as string)
      const result = await this.resHistoryService.getByCreator(stripDash(token.id))
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.resHistoryService.delete(req.params.id)
      return res.status(200).send(result)
    } catch (err: any) {
      const {code, message, data} = resErr(err)
      res.status(code).send({data, message})
    }
  }
}