import * as fs from 'node:fs'

export class Vardec {
  private static instance: Vardec
  private readonly value: any

  constructor (filePath: string) {
    try {
      const data = fs.readFileSync(filePath, 'utf8')
      this.value = JSON.parse(data)
    } catch (error) {
      console.error('Error reading or parsing the file:', error)
      this.value = null
    }
  }

  static init(filePath: string) {
    if (!Vardec.instance) {
      Vardec.instance = new Vardec(filePath);
    }
  }

  static getString(key: string): string {
    if (!Vardec.instance) {
      throw new Error('Vardec has not been initialized. Call initialize() first.');
    }
    const keys = key.split(".")
    let res: any
    try {
      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          res = Vardec.instance.value[keys[i]]
        } else {
          res = res[keys[i]]
        }
      }
    } catch {
      res = ''
    }
    if (typeof res !== 'string') res = ''
    return res
  }

  static getNumber(key: string): number {
    if (!Vardec.instance) {
      throw new Error('Vardec has not been initialized. Call initialize() first.');
    }
    const keys = key.split(".")
    let res: any

    try {
      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          res = Vardec.instance.value[keys[i]]
        } else {
          res = res[keys[i]]
        }
      }
    } catch {
      res = 0
    }
    if (typeof res !== 'number') res = 0
    return res
  }

  static getBoolean(key: string): boolean {
    if (!Vardec.instance) {
      throw new Error('Vardec has not been initialized. Call initialize() first.');
    }
    const keys = key.split(".")
    let res: any

    try {
      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          res = Vardec.instance.value[keys[i]]
        } else {
          res = res[keys[i]]
        }
      }
    } catch {
      res = false
    }
    if (typeof res !== 'boolean') res = false
    return res
  }
}