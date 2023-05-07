import fs from 'node:fs'
import path from 'node:path'
import { execaCommand } from 'execa'
import { findUp } from 'find-up'
import terminalLink from 'terminal-link'
import * as tyck from '@tyck/prompts'
import { consolji } from 'consolji'
import type { Agent } from './agents'
import { AGENTS, INSTALL_PAGE, LOCKS } from './agents'
import { cmdExists } from './utils'
import { getDefaultAgent } from './config'

export interface DetectOptions {
  autoInstall?: boolean
  cwd?: string
  skipPrompt?: boolean
}

export async function detect({ autoInstall, cwd, skipPrompt }: DetectOptions = {}) {
  let agent: Agent | null = null
  let version: string | null = null
  const lockPath = await findUp(Object.keys(LOCKS), { cwd })
  let packageJsonPath: string | undefined

  if (lockPath)
    packageJsonPath = path.resolve(lockPath, '../package.json')
  else
    packageJsonPath = await findUp('package.json', { cwd })

  // read `packageManager` field in package.json
  if (packageJsonPath && fs.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
      if (typeof pkg.packageManager === 'string') {
        const [name, ver] = pkg.packageManager.split('@')
        version = ver
        if (name === 'yarn' && parseInt(ver) > 1)
          agent = 'yarn@berry'
        else if (name === 'pnpm' && parseInt(ver) < 7)
          agent = 'pnpm@6'
        else if (name in AGENTS)
          agent = name
        else
          consolji.warn('[nyxi] Unknown packageManager:', pkg.packageManager)
      }
    }
    catch {}
  }

  // detect based on lock
  if (!agent && lockPath)
    agent = LOCKS[path.basename(lockPath)]

  // If no package manager is detected, prompt the user to choose one
  if (!agent && skipPrompt !== true) {
    const defaultAgent = await getDefaultAgent()
    if ((defaultAgent as any) === 'prompt') {
      agent = await tyck.select({
        message: 'Please choose a package manager:',
        options: [
          { value: 'pnpm', label: 'pnpm (recommended)' },
          { value: 'npm', label: 'npm' },
          { value: 'yarn', label: 'yarn' },
          { value: 'bun', label: 'bun' },
        ],
      }) as Agent
    }
    else {
      agent = defaultAgent as Agent
    }
  }
  // auto install
  if (agent && !cmdExists(agent.split('@')[0])) {
    if (!autoInstall) {
      consolji.warn(`[nyxi] Detected ${agent} but it doesn't seem to be installed.\n`)

      if (process.env.CI)
        process.exit(1)

      const link = terminalLink(agent, INSTALL_PAGE[agent])
      const tryInstall = await tyck.select({
        message: `Would you like to globally install ${link}?`,
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      })
      if (tryInstall === 0) {
        tyck.cancel('nevermind')
        process.exit(0)
      }
      else if (!tryInstall) {
        process.exit(1)
      }
    }

    await execaCommand(`npm i -g ${agent}${version ? `@${version}` : ''}`, { stdio: 'inherit', cwd })
  }

  return agent
}
