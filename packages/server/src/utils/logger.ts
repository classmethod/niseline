/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export interface Logger {
  debug: (obj: object) => void
  info: (obj: object) => void
  warn: (obj: object) => void
  error: (obj: object) => void
}

export class ConsoleLogger implements Logger {
  debug(obj: object) {
    console.debug(JSON.stringify(obj))
  }

  info(obj: object) {
    console.info(JSON.stringify(obj))
  }

  warn(obj: object) {
    console.warn(JSON.stringify(obj))
  }

  error(obj: object) {
    console.error(JSON.stringify(obj))
  }
}
