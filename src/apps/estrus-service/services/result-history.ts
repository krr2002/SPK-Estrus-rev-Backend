import {ERR_NO_ROW, RestResponseType} from '@src/utils/response'
import {DSSResultRepository} from '@src/apps/estrus-service/repositories/dss-result/interface'
import {ResultHistoryResponseDTO} from '@src/apps/estrus-service/controllers/result-history/dto'


export class ResultHistoryService {
  private readonly dssResRepo: DSSResultRepository

  constructor(rdr: DSSResultRepository) {
    this.dssResRepo = rdr
  }

  getAll = async (): Promise<RestResponseType> => {
    try {
      const resData = await this.dssResRepo.getAll()
      const res: ResultHistoryResponseDTO[] = []
      for (const datum of resData) {
        res.push({
          id: datum.id,
          name: datum.name,
          age: datum.age,
          condition: datum.condition,
          dssResult: datum.dssResult,
          createdBy: datum.createdBy,
          createdAt: datum.createdAt,
        })
      }
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      throw err
    }
  }
  getByCreator = async (creatorId: string): Promise<RestResponseType> => {
    try {
      const resData = await this.dssResRepo.getByCreator(creatorId)
      const res: ResultHistoryResponseDTO[] = []
      for (const datum of resData) {
        res.push({
          id: datum.id,
          name: datum.name,
          age: datum.age,
          condition: datum.condition,
          dssResult: datum.dssResult,
          createdBy: datum.createdBy,
          createdAt: datum.createdAt,
        })
      }
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      throw err
    }
  }
  getById = async (id: string): Promise<RestResponseType> => {
    try {
      const res = await this.dssResRepo.getById(id)
      if (!res) throw ERR_NO_ROW
      return {message: 'SUCCESS', data: res}
    } catch (err) {
      throw err
    }
  }
  delete = async (id: string): Promise<RestResponseType> => {
    try {
      await this.dssResRepo.delete(id)
      return {message: 'DELETED', data: {}}
    } catch (err) {
      throw err
    }
  }
}