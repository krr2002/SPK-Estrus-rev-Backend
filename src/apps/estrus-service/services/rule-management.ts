import {RuleBaseRepository} from '@src/apps/estrus-service/repositories/rule-base/interface'
import {isGenericError, RestResponseType} from '@src/utils/response'
import {CreateRuleDTO, ResponseDTO} from '@src/apps/estrus-service/controllers/rule-management/dto'
import {Logger} from '@src/utils/logger'


export class RuleManagementService {
  private readonly dssRuleRepo: RuleBaseRepository

  constructor(rdp: RuleBaseRepository) {
    this.dssRuleRepo = rdp
  }

  create = async (param: ResponseDTO): Promise<RestResponseType> => {
    try {
      await this.dssRuleRepo.create(param)
      return {message: 'CREATED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  getAll = async (): Promise<RestResponseType> => {
    try {
      const ruleData = await this.dssRuleRepo.getAll()
      const res: ResponseDTO[] = []
      for (const item of ruleData) {
        res.push({
          id: item.id,
          name: item.name,
          linguisticCombo: item.linguisticCombo,
          operator: item.operator,
          result: item.result,
        })
      }
      return {message: 'CREATED', data: res}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  getById = async (id: string): Promise<RestResponseType> => {
    try {
      const res = await this.dssRuleRepo.getById(id)
      let result: ResponseDTO|null = null
      if (res) {
        result = {
          id: res.id,
          name: res.name,
          linguisticCombo: res.linguisticCombo,
          operator: res.operator,
          result: res.result,
        }
      }
      return {message: 'SUCCESS', data: result || {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  update = async (id: string, param: CreateRuleDTO): Promise<RestResponseType> => {
    try {
      await this.dssRuleRepo.update(id, param)
      return {message: 'UPDATED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
  delete = async (id: string): Promise<RestResponseType> => {
    try {
      await this.dssRuleRepo.delete(id)
      return {message: 'DELETED', data: {}}
    } catch (err: any) {
      if (!isGenericError(err)) Logger.warn(err.message)
      throw err
    }
  }
}