import path from 'node:path'
import { tmpdir } from 'node:os'
import fs from 'fs-extra'
import type { SpyInstance } from 'vitest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { AGENTS, parseNyxa, parseNyxi, parseNyxlx, parseNyxu, parseNyxun, runCli } from '../../src'

import type { Runner } from '../../src'

let basicLog: SpyInstance, errorLog: SpyInstance, warnLog: SpyInstance, infoLog: SpyInstance

function runCliTest(fixtureName: string, agent: string, runner: Runner, args: string[]) {
   return async () => {
      const cwd = await fs.mkdtemp(path.join(tmpdir(), 'nyxi-'))
      const fixture = path.join(__dirname, '..', 'fixtures', fixtureName, agent)
      await fs.copy(fixture, cwd)

      await runCli(
         async (agent, _, ctx) => {
            // we override the args to be test specific
            return runner(agent, args, ctx)
         },
         {
            programmatic: true,
            cwd,
            args,
         },
      ).catch((e) => {
      // it will always throw if execa is mocked
         if (e.command)
            expect(e.command).toMatchSnapshot()
         else
            expect(e.message).toMatchSnapshot()
      })
   }
}

beforeAll(() => {
   basicLog = vi.spyOn(console, 'log')
   warnLog = vi.spyOn(console, 'warn')
   errorLog = vi.spyOn(console, 'error')
   infoLog = vi.spyOn(console, 'info')

   vi.mock('execa', async (importOriginal) => {
      const mod = await importOriginal() as any
      return {
         ...mod,
         execaCommand: (cmd: string) => {
            // break execution flow for easier snapshotting
            // eslint-disable-next-line no-throw-literal
            throw { command: cmd }
         },
      }
   })
})

afterAll(() => {
   vi.resetAllMocks()
})

const agents = [...Object.keys(AGENTS), 'unknown']
const fixtures = ['lockfile', 'packager']

// matrix testing of: fixtures x agents x commands
fixtures.forEach(fixture => describe(fixture, () => agents.forEach(agent => describe(agent, () => {
   /** nyxa */
   it('nyxa', runCliTest(fixture, agent, parseNyxa, []))
   it('nyxa run foo', runCliTest(fixture, agent, parseNyxa, ['run', 'foo']))

   /** nyxi */
   it('nyxi', runCliTest(fixture, agent, parseNyxi, []))
   it('nyxi foo', runCliTest(fixture, agent, parseNyxi, ['foo']))
   it('nyxi foo -D', runCliTest(fixture, agent, parseNyxi, ['foo', '-D']))
   it('nyxi --frozen', runCliTest(fixture, agent, parseNyxi, ['--frozen']))
   it('nyxi -g foo', runCliTest(fixture, agent, parseNyxi, ['-g', 'foo']))

   /** nyxlx */
   it('nyxlx', runCliTest(fixture, agent, parseNyxlx, ['foo']))

   /** nyxu */
   it('nyxu', runCliTest(fixture, agent, parseNyxu, []))
   it('nyxu -i', runCliTest(fixture, agent, parseNyxu, ['-i']))

   /** nyxun */
   it('nyxun foo', runCliTest(fixture, agent, parseNyxun, ['foo']))
   it('nyxun -g foo', runCliTest(fixture, agent, parseNyxun, ['-g', 'foo']))

   it('no logs', () => {
      expect(basicLog).not.toHaveBeenCalled()
      expect(warnLog).not.toHaveBeenCalled()
      expect(errorLog).not.toHaveBeenCalled()
      expect(infoLog).not.toHaveBeenCalled()
   })
}))))
