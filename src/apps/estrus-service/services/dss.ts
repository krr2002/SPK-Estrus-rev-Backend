import {RuleBaseRepository} from '@src/apps/estrus-service/repositories/rule-base/interface'
import {RestResponseType} from '@src/utils/response'
import {DSSDTO} from '@src/apps/estrus-service/controllers/dss/dto'
import {DSSLinguisticRepository} from '@src/apps/estrus-service/repositories/dss-linguistic/interface'
import {DSSResultRepository} from '@src/apps/estrus-service/repositories/dss-result/interface'


export class DSSService {
  private readonly dssRuleRepo: RuleBaseRepository
  private readonly dssLangRepo: DSSLinguisticRepository
  private readonly dssResRepo: DSSResultRepository

  constructor(rdp: RuleBaseRepository, rdl: DSSLinguisticRepository, rdr: DSSResultRepository) {
    this.dssRuleRepo = rdp
    this.dssLangRepo = rdl
    this.dssResRepo = rdr
  }

  run = async (param: DSSDTO): Promise<RestResponseType> => {
    try {
      const dssCombineData = await this.dssLangRepo.getByIds(param.linguisticCombo)
      if (dssCombineData.length === 0) return {message: 'FAIL', data: ['no ruleset available']}
      const ruleData = await this.dssRuleRepo.getByAndLinguisticCombo(param.linguisticCombo)
      if (!ruleData) return {message: 'FAIL', data: ['no ruleset available']}
      const ruleSets = []
      for (const ruleSet of dssCombineData) {
        ruleSets.push({
          key: ruleSet.paramName,
          value: ruleSet.langName,
        })
      }
      const res = await this.dssResRepo.create({
        ruleSets,
        name: param.specimenName,
        result: ruleData.result,
      })
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      throw err
    }
  }
}