import {DSSParamRepository} from '@src/apps/estrus-service/repositories/dss-param/interface'
import {ERR_NO_ROW, isGenericError, RestResponseType} from '@src/utils/response'
import {ParamRequestDTO, ParamResultDTO} from '@src/apps/estrus-service/controllers/param-management/dto'
import {Logger} from '@src/utils/logger'


export class ParamManagementService {
  private readonly dssParamRepo: DSSParamRepository

  constructor(rdp: DSSParamRepository) {
    this.dssParamRepo = rdp
  }

  create = async (param: ParamRequestDTO): Promise<RestResponseType> => {
    try {
      const id = await this.dssParamRepo.create(param)
      return {message: 'CREATED', data: {id}}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
  getById = async (id: string): Promise<RestResponseType> => {
    try {
      const res = await this.dssParamRepo.getById(id)
      if (!res) throw ERR_NO_ROW
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
  getAll = async (): Promise<RestResponseType> => {
    try {
      const res = await this.dssParamRepo.getAll()
      const result: ParamResultDTO[] = []
      for (const item of res) {
        result.push({
          id: item.id,
          name: item.name,
          type: item.type,
          note: item.note,
        })
      }
      return {message: 'SUCCESS', data: result, count: result.length}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
  update = async (id: string, param: ParamRequestDTO): Promise<RestResponseType> => {
    try {
      await this.dssParamRepo.update(id, param)
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
  delete = async (id: string): Promise<RestResponseType> => {
    try {
      await this.dssParamRepo.delete(id)
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      if (!isGenericError()) Logger.warn(err)
      throw err
    }
  }
}