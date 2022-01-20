/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

export interface Logger {
  info(message: string): void
  error(message: string): void
}

export class ConsoleLogger implements Logger {
  info(message: string) {
    console.log(`@niseline/niseliff INFO: ${message}`)
  }

  error(message: string) {
    console.error(`@niseline/niseliff ERROR: ${message}`)
  }
}
