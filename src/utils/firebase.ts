import {initializeApp, cert} from 'firebase-admin/app'
import * as path from 'node:path'
import {getFirestore} from 'firebase-admin/firestore'


export const firestore = (serviceAccountPath: string) => {
  console.log(serviceAccountPath)
  const cobaPath = path.dirname(`../../${serviceAccountPath}`)
  console.log('path: ', cobaPath)
  initializeApp({
    credential: cert(cobaPath)
  })
  return getFirestore()
}