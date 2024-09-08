import {CreateParamType, RuleBaseDataType, RuleBaseRepository} from './interface'
import {CollectionReference, Firestore} from '@google-cloud/firestore'
import {stripDashAll} from '@src/utils/uuid'
import dayjs from 'dayjs'
import {ERR_DUPLICATE, ERR_NO_ROW} from '@src/utils/response'


export class FirestoreRuleBaseRepository implements RuleBaseRepository {
  private readonly noSql: CollectionReference

  constructor(noSql: Firestore) {
    this.noSql = noSql.collection('rule_bases')
  }

  create = async (arg: CreateParamType) => {
    arg.linguisticCombo = stripDashAll(arg.linguisticCombo)
    const datum = {
      ...arg,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      deletedAt: null,
    }
    try {
      const ruleData = await this.getByAndLinguisticCombo(arg.linguisticCombo)
      if (ruleData) throw ERR_DUPLICATE
      await this.noSql.add(datum)
    } catch (err) {
      throw err
    }
  }
  getAll = async () => {
    try {
      const res: RuleBaseDataType[] = []
      const repoData = await this.noSql.where('deletedAt', '==', null).get()
      repoData.forEach((item) => {
        const datum = item.data()
        res.push({
          id: item.id,
          name: datum.name,
          linguisticCombo: datum.linguisticCombo,
          operator: datum.operator,
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
  getByAndLinguisticCombo = async (combo: string[]) => {
    try {
      let ruleData: RuleBaseDataType[] = []
      const repoData = await this.noSql
        .where('linguisticCombo', 'array-contains', combo[0])
        .where('deletedAt', '==', null)
        .get()
      repoData.forEach((item) => {
        const datum = item.data()
        ruleData.push({
          id: item.id,
          name: datum.name,
          linguisticCombo: datum.linguisticCombo,
          operator: datum.operator,
          result: datum.result,
          createdAt: datum.createdAt,
          updatedAt: datum.updatedAt,
          deletedAt: datum.deletedAt,
        })
      })
      console.log(ruleData)
      for (let i = 1; i < combo.length; i++) {
        ruleData = ruleData.filter((item) => item.linguisticCombo.includes(combo[i]))
        console.log('recursive ', i)
        console.log(ruleData)
        if (ruleData.length === 0) return null
      }
      for (const datum of ruleData) {
        if (datum.linguisticCombo.length === combo.length) return datum
      }
      return null
    } catch (err) {
      throw err
    }
  }
  getById = async (id: string) => {
    try {
      const repoData = await this.noSql.doc(id).get()
      const datum = repoData.data()
      if (!datum) return null
      return {
        id: repoData.id,
        name: datum.name,
        linguisticCombo: datum.linguisticCombo,
        operator: datum.operator,
        result: datum.result,
        createdAt: datum.createdAt,
        updatedAt: datum.updatedAt,
        deletedAt: datum.deletedAt,
      }
    } catch (err) {
      throw err
    }
  }
  update = async (id: string, arg: CreateParamType) => {
    try {
      const repoData = await this.noSql.doc(id).get()
      const datum = repoData.data()
      if (!datum) throw ERR_NO_ROW
      await this.noSql.doc(id).set({
        id: id,
        name: arg.name,
        linguisticCombo: arg.linguisticCombo,
        operator: arg.operator,
        result: arg.result,
        createdAt: datum.createdAt,
        updatedAt: dayjs().toISOString(),
        deletedAt: datum.deletedAt,
      })
    } catch (err) {
      throw err
    }
  }
  delete = async (id: string) => {
    try {
      const repoData = await this.noSql.doc(id).get()
      const datum = repoData.data()
      if (!datum) return
      await this.noSql.doc(id).set({
        id: id,
        name: datum.name,
        linguisticCombo: datum.linguisticCombo,
        operator: datum.operator,
        result: datum.result,
        createdAt: datum.createdAt,
        updatedAt: dayjs().toISOString(),
        deletedAt: dayjs().toISOString(),
      })
    } catch (err) {
      throw err
    }
  }
}