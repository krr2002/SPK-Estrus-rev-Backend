import {RuleBaseRepository} from '@src/apps/estrus-service/repositories/rule-base/interface'
import {RestResponseType} from '@src/utils/response'
import {CreateRuleDTO} from '@src/apps/estrus-service/controllers/rule-management/dto'


export class RuleManagementService {
  private readonly dssRuleRepo: RuleBaseRepository

  constructor(rdp: RuleBaseRepository) {
    this.dssRuleRepo = rdp
  }

  create = async (param: CreateRuleDTO): Promise<RestResponseType> => {
    try {
      await this.dssRuleRepo.create(param)
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
}