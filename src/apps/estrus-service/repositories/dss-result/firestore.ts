import {CreateParamType, DSSResultDataType, DSSResultRepository} from './interface'
import {CollectionReference, Firestore} from '@google-cloud/firestore'
import {stripDash} from '@src/utils/uuid'
import dayjs from 'dayjs'
import {v7 as uuid} from 'uuid'


export class FirestoreDSSResultRepository implements DSSResultRepository {
  private readonly noSql: CollectionReference

  constructor(noSql: Firestore) {
    this.noSql = noSql.collection('dss_results')
  }

  create = async (arg: CreateParamType) => {
    try {
      await this.noSql.doc(stripDash(uuid())).set({
        name: arg.name,
        age: arg.age,
        condition: arg.condition,
        dssResult: arg.dssResult,
        createdBy: stripDash(arg.createdBy),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        deletedAt: null,
      })
    } catch (err: any) {
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
          age: datum.age,
          condition: datum.condition,
          dssResult: datum.dssResult,
          createdBy: datum.createdBy,
          createdAt: datum.createdAt,
          updatedAt: datum.updatedAt,
          deletedAt: datum.deletedAt,
        })
      })
      return res
    } catch (err: any) {
      throw err
    }
  }
  getByCreator = async (creatorId: string) => {
    try {
      let res: DSSResultDataType[] = []
      const repoData = await this.noSql
        .where('createdBy', '==', stripDash(creatorId))
        .where('deletedAt', '==', null)
        .get()
      repoData.forEach((item) => {
        const datum = item.data()
        res.push({
          id: item.id,
          name: datum.name,
          age: datum.age,
          condition: datum.condition,
          dssResult: datum.dssResult,
          createdBy: datum.createdBy,
          createdAt: datum.createdAt,
          updatedAt: datum.updatedAt,
          deletedAt: datum.deletedAt,
        })
      })
      return res
    } catch (err: any) {
      throw err
    }
  }
  getById = async (id: string) => {
    try {
      const repoData = await this.noSql.doc(stripDash(id)).get()
      const datum = repoData.data()
      if (!datum) return null
      return {
        id: repoData.id,
        name: datum.name,
        age: datum.age,
        condition: datum.condition,
        dssResult: datum.dssResult,
        createdBy: datum.createdBy,
        createdAt: datum.createdAt,
        updatedAt: datum.updatedAt,
        deletedAt: datum.deletedAt,
      }
    } catch (err: any) {
      throw err
    }
  }
  delete = async (id: string) => {
    try {
      await this.noSql.doc(stripDash(id)).delete()
    } catch (err: any) {
      throw err
    }
  }
}