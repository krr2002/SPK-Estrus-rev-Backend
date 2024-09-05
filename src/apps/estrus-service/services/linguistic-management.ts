import {RestResponseType} from '@src/utils/response'
import {CreateDTO} from '@src/apps/estrus-service/controllers/linguistic-management/dto'
import {DSSLinguisticRepository} from '@src/apps/estrus-service/repositories/dss-linguistic/interface'


export class LinguisticManagementService {
  private readonly dssLangRepo: DSSLinguisticRepository

  constructor(rdl: DSSLinguisticRepository) {
    this.dssLangRepo = rdl
  }

  create = async (param: CreateDTO): Promise<RestResponseType> => {
    try {
      await this.dssLangRepo.create({paramId: param.paramId, name: param.name, minValue: param.min})
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  getByParamId = async (paramId: string): Promise<RestResponseType> => {
    try {
      const res = await this.dssLangRepo.getAllByParamId(paramId)
      return {message: 'SUCCESS', data: res || {}}
    } catch (err) {
      throw err
    }
  }
}