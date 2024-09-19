import {RuleBaseRepository} from '@src/apps/estrus-service/repositories/rule-base/interface'
import {isGenericError, RestResponseType} from '@src/utils/response'
import {DSSDTO, DSSParamWithOptionsDTO} from '@src/apps/estrus-service/controllers/dss/dto'
import {DSSLinguisticRepository} from '@src/apps/estrus-service/repositories/dss-linguistic/interface'
import {DSSResultRepository} from '@src/apps/estrus-service/repositories/dss-result/interface'
import {stripDash, stripDashAll} from '@src/utils/uuid'
import {Logger} from '@src/utils/logger'


export class DSSService {
  private readonly dssRuleRepo: RuleBaseRepository
  private readonly dssLangRepo: DSSLinguisticRepository
  private readonly dssResRepo: DSSResultRepository

  constructor(rdp: RuleBaseRepository, rdl: DSSLinguisticRepository, rdr: DSSResultRepository) {
    this.dssRuleRepo = rdp
    this.dssLangRepo = rdl
    this.dssResRepo = rdr
  }

  getAllParam = async (): Promise<RestResponseType> => {
    try {
      const dssRepo = await this.dssLangRepo.getAllWithParam()
      const groupedData = Object.values(dssRepo.reduce((acc: any, curr) => {
        if (!acc[curr.paramId]) {
          acc[curr.paramId] = {
            id: curr.paramId,
            name: curr.paramName,
            type: curr.type,
            options: []
          }
        }
        acc[curr.paramId].options.push({
          id: curr.id,
          name: curr.name,
          min: curr.minValue
        })
        return acc
      }, {}))
      return {message: 'SUCCESS', data: groupedData}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
  // TODO: can only handle AND operator
  run = async (param: DSSDTO & { creatorId: string }): Promise<RestResponseType> => {
    try {
      const dssCombineData = await this.dssLangRepo.getByIds(stripDashAll(param.conditions))
      if (dssCombineData.length === 0) return {message: 'FAIL', data: ['no ruleset available']}
      const ruleData = await this.dssRuleRepo.getByAndLinguisticCombo(stripDashAll(param.conditions))
      if (!ruleData) return {message: 'FAIL', data: ['no ruleset available']}
      const ruleSets = []
      for (const ruleSet of dssCombineData) {
        ruleSets.push({
          key: ruleSet.paramName,
          value: ruleSet.langName,
        })
      }

      // Concurrently saving the result history and returning the result to client
      await this.dssResRepo.create({
        name: param.specimenName,
        age: param.age,
        condition: ruleSets,
        dssResult: ruleData.result,
        createdBy: stripDash(param.creatorId),
      })
      return {message: 'SUCCESS', data: [ruleData.result]}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
}