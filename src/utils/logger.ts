import winston from 'winston'
import dayjs from 'dayjs'


export class Logger {
  private static instance: Logger
  private readonly log: winston.Logger

  constructor(filename: string) {
    const {combine, timestamp, uncolorize, colorize, printf} = winston.format
    const consoleFormat = printf((info) => `[${dayjs().toISOString()}] ${info.level}: ${info.message}`)
    this.log = winston.createLogger({
      format: colorize({colors: {
          info: 'blue',
          error: 'red',
          warn: 'yellow',
        }}),
      transports: [
        new winston.transports.Console({format: combine(consoleFormat, )}),
        new winston.transports.File({
          filename,
          level: 'warn',
          format: combine(timestamp(), uncolorize(), winston.format.json())
        }),
      ],
    })
  }

  static init(filename: string) {
    Logger.instance = new Logger(filename)
  }
  static info(...msgs: (string|number)[]) {
    Logger.instance.log.info(msgs.join(''))
  }
  static warn(...msgs: (string|number)[]) {
    Logger.instance.log.warn(msgs.join(''))
  }
  static error(...msgs: (string|number)[]) {
    Logger.instance.log.error(msgs.join(''))
  }
}