import {Pool} from 'pg'
import express from 'express'
import {RestAuthController} from '@src/apps/estrus-service/controllers/auth/rest'
import {PostgresUserRepository} from '@src/apps/estrus-service/repositories/user/postgres'
import {AuthService} from '@src/apps/estrus-service/services/auth'


export const initEstrus = (db: Pool) => {
  const router = express.Router()
  const userRepo = new PostgresUserRepository(db)

  const authServ = new AuthService(userRepo)

  const authCtrl = new RestAuthController(authServ)

  router.post('/auth/register/user', authCtrl.registerUser)
  router.post('/auth/register/admin', authCtrl.registerAdmin)
  router.post('/auth/register/expert', authCtrl.registerExpert)
  router.post('/auth/login', authCtrl.login)

  return router
}