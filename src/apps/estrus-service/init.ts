import {Pool} from 'pg'
import express from 'express'
import {RestAuthController} from '@src/apps/estrus-service/controllers/auth/rest'
import {PostgresUserRepository} from '@src/apps/estrus-service/repositories/user/postgres'
import {AuthService} from '@src/apps/estrus-service/services/auth'
import {PostgresDSSParamRepository} from '@src/apps/estrus-service/repositories/dss-param/postgres'
import {ParamManagementService} from '@src/apps/estrus-service/services/param-management'
import {RestParamManagementController} from '@src/apps/estrus-service/controllers/param-management/rest'
import {PostgresDSSLinguisticRepository} from '@src/apps/estrus-service/repositories/dss-linguistic/postgres'
import {LinguisticManagementService} from '@src/apps/estrus-service/services/linguistic-management'
import {RestLangManagementController} from '@src/apps/estrus-service/controllers/linguistic-management/rest'
import {Firestore} from '@google-cloud/firestore'
import {FirestoreRuleBaseRepository} from '@src/apps/estrus-service/repositories/rule-base/firestore'
import {RuleManagementService} from '@src/apps/estrus-service/services/rule-management'
import {RestRuleManagementController} from '@src/apps/estrus-service/controllers/rule-management/rest'
import {DSSService} from '@src/apps/estrus-service/services/dss'
import {RestDSSController} from '@src/apps/estrus-service/controllers/dss/rest'
import {FirestoreDSSResultRepository} from '@src/apps/estrus-service/repositories/dss-result/firestore'


export const initEstrus = (sql: Pool, noSql: Firestore) => {
  const router = express.Router()

  const userRepo = new PostgresUserRepository(sql)
  const dssParamRepo = new PostgresDSSParamRepository(sql)
  const dssLangRepo = new PostgresDSSLinguisticRepository(sql)
  const dssRuleRepo = new FirestoreRuleBaseRepository(noSql)
  const dssResRepo = new FirestoreDSSResultRepository(noSql)

  const authServ = new AuthService(userRepo)
  const paramMgmtServ = new ParamManagementService(dssParamRepo)
  const langMgmtServ = new LinguisticManagementService(dssLangRepo)
  const ruleMgmtServ = new RuleManagementService(dssRuleRepo)
  const dssServ = new DSSService(dssRuleRepo, dssLangRepo, dssResRepo)

  const authCtrl = new RestAuthController(authServ)
  const paramMgmtCtrl = new RestParamManagementController(paramMgmtServ)
  const langMgmtCtrl = new RestLangManagementController(langMgmtServ)
  const ruleMgmtCtrl = new RestRuleManagementController(ruleMgmtServ)
  const dssCtrl = new RestDSSController(dssServ)

  router.post('/auth/register/user', authCtrl.registerUser)
  router.post('/auth/register/admin', authCtrl.registerAdmin)
  router.post('/auth/register/expert', authCtrl.registerExpert)
  router.post('/auth/login', authCtrl.login)

  router.post('/param-management', paramMgmtCtrl.create)
  router.get('/param-management/:id', paramMgmtCtrl.getById)
  router.get('/param-management', paramMgmtCtrl.getAll)

  router.post('/lang-management', langMgmtCtrl.create)
  router.get('/lang-management/:paramId', langMgmtCtrl.getByParamId)

  router.post('/rule-management', ruleMgmtCtrl.create)

  router.post('/dss', dssCtrl.run)

  return router
}