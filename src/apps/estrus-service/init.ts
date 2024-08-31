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


export const initEstrus = (db: Pool) => {
  const router = express.Router()

  const userRepo = new PostgresUserRepository(db)
  const dssParamRepo = new PostgresDSSParamRepository(db)
  const dssLangRepo = new PostgresDSSLinguisticRepository(db)

  const authServ = new AuthService(userRepo)
  const paramMgmtServ = new ParamManagementService(dssParamRepo)
  const langMgmtServ = new LinguisticManagementService(dssLangRepo)

  const authCtrl = new RestAuthController(authServ)
  const paramMgmtCtrl = new RestParamManagementController(paramMgmtServ)
  const langMgmtCtrl = new RestLangManagementController(langMgmtServ)


  router.post('/auth/register/user', authCtrl.registerUser)
  router.post('/auth/register/admin', authCtrl.registerAdmin)
  router.post('/auth/register/expert', authCtrl.registerExpert)
  router.post('/auth/login', authCtrl.login)

  router.post('/param-management', paramMgmtCtrl.create)
  router.get('/param-management/:id', paramMgmtCtrl.getById)
  router.get('/param-management', paramMgmtCtrl.getAll)

  router.post('/lang-management', langMgmtCtrl.create)
  router.get('/lang-management/:paramId', langMgmtCtrl.getByParamId)

  return router
}