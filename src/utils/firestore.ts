import * as path from 'node:path'
import {Firestore} from '@google-cloud/firestore'

type ServiceAccountLocationType = 'local' | 'web'

export const firestore = (projectId: string, serviceAccountPath: string, type: ServiceAccountLocationType = 'local') => {
  console.log(serviceAccountPath)
  let keyfilePath = path.resolve(`./${serviceAccountPath}`)
  if (type !== 'local') {
    // pass
  }
  return new Firestore({
    projectId: projectId,
    keyFilename: keyfilePath,
  })
}