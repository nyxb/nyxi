import chalk from 'chalk'
import ora from 'ora'
import gradient from 'gradient-string'

const GREEN = '#14F195'
const PURPLE = '#9945FF'
const RED = '#ed4245'
const YELLOW = '#fee75c'

export const nyxGradient = gradient(GREEN, PURPLE)
export const nyxGreen = chalk.hex(GREEN)
export const nyxPurple = chalk.hex(PURPLE)
export const nyxRed = chalk.hex(RED)
export const yellow = chalk.hex(YELLOW)

export function nyxLoader(text: string) {
  return ora({
    text,
    spinner: {
      frames: ['   ', nyxGreen('>  '), nyxGreen('>> '), nyxGreen('>>>')],
    },
  })
}

export function info(...args: any[]) {
  // eslint-disable-next-line no-console
  console.log(nyxGreen.bold('>>>'), ...args)
}

export function error(...args: any[]) {
  console.error(nyxRed.bold('>>>'), ...args)
}

export function warn(...args: any[]) {
  console.error(yellow.bold('>>>'), ...args)
}
