import { expect, it } from 'vitest'
import { parseNyxun } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxun(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('single uninstall', _('axios', 'bun remove axios'))

it('multiple', _('eslint @types/node', 'bun remove eslint @types/node'))

it('global', _('eslint nyxi -g', 'bun remove -g eslint nyxi'))
