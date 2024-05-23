import { expect, it } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'npm'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxlx(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('single uninstall', _('esbuild', 'npx esbuild'))
it('multiple', _('esbuild --version', 'npx esbuild --version'))
