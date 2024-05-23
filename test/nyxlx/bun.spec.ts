import { expect, it } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxlx(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('single uninstall', _('esbuild', 'bunx esbuild'))
it('multiple', _('esbuild --version', 'bunx esbuild --version'))
