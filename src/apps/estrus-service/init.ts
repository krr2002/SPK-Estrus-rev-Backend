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
import {PostgresRoleRepository} from '@src/apps/estrus-service/repositories/role/postgres'
import {UserService} from '@src/apps/estrus-service/services/user'
import {RestUserController} from '@src/apps/estrus-service/controllers/user/rest'
import {ResultHistoryService} from '@src/apps/estrus-service/services/result-history'
import {RestResultHistoryController} from '@src/apps/estrus-service/controllers/result-history/rest'


export const initEstrus = (sql: Pool, noSql: Firestore) => {
  const router = express.Router()

  const userRepo = new PostgresUserRepository(sql)
  const ruleRepo = new PostgresRoleRepository(sql)
  const dssParamRepo = new PostgresDSSParamRepository(sql)
  const dssLangRepo = new PostgresDSSLinguisticRepository(sql)
  const dssRuleRepo = new FirestoreRuleBaseRepository(noSql)
  const dssResRepo = new FirestoreDSSResultRepository(noSql)

  const authServ = new AuthService(userRepo, ruleRepo)
  const userServ = new UserService(userRepo)
  const paramMgmtServ = new ParamManagementService(dssParamRepo)
  const langMgmtServ = new LinguisticManagementService(dssLangRepo)
  const ruleMgmtServ = new RuleManagementService(dssRuleRepo)
  const dssServ = new DSSService(dssRuleRepo, dssLangRepo, dssResRepo)
  const resHistoryServ = new ResultHistoryService(dssResRepo)

  const authCtrl = new RestAuthController(authServ)
  const userCtrl = new RestUserController(userServ)
  const paramMgmtCtrl = new RestParamManagementController(paramMgmtServ)
  const langMgmtCtrl = new RestLangManagementController(langMgmtServ)
  const ruleMgmtCtrl = new RestRuleManagementController(ruleMgmtServ)
  const dssCtrl = new RestDSSController(dssServ)
  const resHistoryCtrl = new RestResultHistoryController(resHistoryServ)

  router.post('/auth/register/user', authCtrl.registerUser)
  router.post('/auth/register/admin', authCtrl.registerAdmin)
  router.post('/auth/register/expert', authCtrl.registerExpert)
  router.post('/auth/login', authCtrl.login)
  router.delete('/auth/logout', authCtrl.logout)

  router.get('/user', userCtrl.getAllNonAdmin)
  router.get('/user/:userId', userCtrl.getById)
  router.put('/user/:userId', userCtrl.update)
  router.delete('/user/:userId', userCtrl.delete)

  router.post('/param-management', paramMgmtCtrl.create)
  router.get('/param-management/:paramId', paramMgmtCtrl.getById)
  router.get('/param-management', paramMgmtCtrl.getAll)
  router.put('/param-management/:paramId', paramMgmtCtrl.update)
  router.delete('/param-management/:paramId', paramMgmtCtrl.delete)

  router.post('/lang-management', langMgmtCtrl.create)
  router.post('/lang-management/ids', langMgmtCtrl.getByIds)
  router.get('/lang-management/:paramId', langMgmtCtrl.getByParamId)
  router.put('/lang-management/:langId', langMgmtCtrl.update)
  router.delete('/lang-management/:langId', langMgmtCtrl.delete)

  router.post('/rule-management', ruleMgmtCtrl.create)
  router.get('/rule-management', ruleMgmtCtrl.getAll)
  router.get('/rule-management/:id', ruleMgmtCtrl.getById)
  router.put('/rule-management/:id', ruleMgmtCtrl.update)
  router.delete('/rule-management/:id', ruleMgmtCtrl.delete)

  router.get('/result-history', resHistoryCtrl.getAll)
  router.get('/result-history/creator', resHistoryCtrl.getByCreator)
  router.get('/result-history/:id', resHistoryCtrl.getById)
  router.delete('/result-history/:id', resHistoryCtrl.delete)

  router.get('/dss/params', dssCtrl.getAllParam)
  router.post('/dss/run', dssCtrl.run)

  return router
}