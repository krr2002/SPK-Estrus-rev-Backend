import {DSSParamRepository} from '@src/apps/estrus-service/repositories/dss-param/interface'
import {ERR_NO_ROW, RestResponseType} from '@src/utils/response'


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
      if (!res) throw ERR_NO_ROW
      return {message: 'SUCCESS', data: res}
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
  update = async (id: string, name: string): Promise<RestResponseType> => {
    try {
      await this.dssParamRepo.update(id, name)
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      throw err
    }
  }
  delete = async (id: string): Promise<RestResponseType> => {
    try {
      await this.dssParamRepo.delete(id)
      return {message: 'SUCCESS', data: {}}
    } catch (err) {
      throw err
    }
  }
}