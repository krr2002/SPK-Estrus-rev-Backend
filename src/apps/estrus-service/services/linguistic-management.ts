import {isGenericError, RestResponseType} from '@src/utils/response'
import {CreateDTO, LangResponseDTO, UpdateDTO} from '@src/apps/estrus-service/controllers/linguistic-management/dto'
import {DSSLinguisticRepository} from '@src/apps/estrus-service/repositories/dss-linguistic/interface'
import {Logger} from '@src/utils/logger'


export class LinguisticManagementService {
  private readonly dssLangRepo: DSSLinguisticRepository

  constructor(rdl: DSSLinguisticRepository) {
    this.dssLangRepo = rdl
  }

  create = async (param: CreateDTO): Promise<RestResponseType> => {
    try {
      await this.dssLangRepo.create({paramId: param.paramId, name: param.name, minValue: param.min, maxValue: param.max})
      return {message: 'CREATED', data: {}}
    } catch (err) {
      if (!isGenericError(err)) Logger.warn(err)
      throw err
    }
  }
  getByParamId = async (paramId: string): Promise<RestResponseType> => {
    try {
      const langData = await this.dssLangRepo.getAllByParamId(paramId)
      const res: LangResponseDTO[] = []
      for (const lang of langData) {
        res.push({
          id: lang.id,
          paramId: lang.paramId,
          name: lang.name,
          min: lang.minValue,
        })
      }
      return {message: 'SUCCESS', data: res || {}}
    } catch (err) {
      if (!isGenericError(err)) Logger.warn(err)
      throw err
    }
  }
  getByIds = async (ids: string[]): Promise<RestResponseType> => {
    try {
      const res = await this.dssLangRepo.getByIds(ids)
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      if (!isGenericError(err)) Logger.warn(err)
      throw err
    }
  }
  update = async (langId: string, param: UpdateDTO): Promise<RestResponseType> => {
    try {
      await this.dssLangRepo.update(langId, {name: param.name, minValue: param.min, maxValue: param.max})
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      if (!isGenericError(err)) Logger.warn(err)
      throw err
    }
  }
  delete = async (langId: string): Promise<RestResponseType> => {
    try {
      await this.dssLangRepo.delete(langId)
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      if (!isGenericError(err)) Logger.warn(err)
      throw err
    }
  }
}