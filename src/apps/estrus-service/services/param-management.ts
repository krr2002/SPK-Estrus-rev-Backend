import {DSSParamRepository} from '@src/apps/estrus-service/repositories/dss-param/interface'
import {RestResponseType} from '@src/utils/response'


export class ParamManagementService {
  private readonly dssParamRepo: DSSParamRepository

  constructor(rdp: DSSParamRepository) {
    this.dssParamRepo = rdp
  }

  create = async (name: string): Promise<RestResponseType> => {
    try {
      await this.dssParamRepo.create(name)
      return {message: 'CREATED', data: {}}
    } catch (err) {
      throw err
    }
  }
  getById = async (id: string): Promise<RestResponseType> => {
    try {
      const res = await this.dssParamRepo.getById(id)
      return {message: 'SUCCESS', data: res || {}}
    } catch (err) {
      throw err
    }
  }
  getAll = async (): Promise<RestResponseType> => {
    try {
      const res = await this.dssParamRepo.getAll()
      return {message: 'SUCCESS', data: res, count: res.length}
    } catch (err) {
      throw err
    }
  }
}