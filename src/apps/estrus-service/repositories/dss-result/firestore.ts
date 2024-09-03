import {CreateParamType, DSSResultDataType, DSSResultRepository} from './interface'
import {CollectionReference, Firestore} from '@google-cloud/firestore'
import {stripDash, stripDashAll} from '@src/utils/uuid'
import dayjs from 'dayjs'
import {ERR_DUPLICATE} from '@src/utils/response'
import {v7 as uuidv7} from 'uuid'


export class FirestoreDSSResultRepository implements DSSResultRepository {
  private readonly noSql: CollectionReference

  constructor(noSql: Firestore) {
    this.noSql = noSql.collection('dss_results')
  }

  create = async (arg: CreateParamType) => {
    const id = stripDash(uuidv7())
    const datum = {
      ...arg,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      deletedAt: null,
    }
    try {
      await this.noSql.doc(id).set(datum)
      return {...datum, id}
    } catch (err) {
      throw err
    }
  }
  getAll = async () => {
    try {
      const res: DSSResultDataType[] = []
      const repoData = await this.noSql.where('deletedAt', '==', null).get()
      repoData.forEach((item) => {
        const datum = item.data()
        res.push({
          id: item.id,
          name: datum.name,
          ruleSets: datum.ruleSets,
          result: datum.result,
          createdAt: datum.createdAt,
          updatedAt: datum.updatedAt,
          deletedAt: datum.deletedAt,
        })
      })
      return res
    } catch (err) {
      throw err
    }
  }
  getById = async (id: string) => {
    try {
      const repoData = await this.noSql
        .doc(stripDash(id))
        .get()
      const datum = repoData.data()
      if (datum && !datum.deletedAt) {
        return {
          id: repoData.id,
          name: datum.name,
          ruleSets: datum.ruleSets,
          result: datum.result,
          createdAt: datum.createdAt,
          updatedAt: datum.updatedAt,
          deletedAt: datum.deletedAt,
        }
      }
      return null
    } catch (err) {
      throw err
    }
  }
}