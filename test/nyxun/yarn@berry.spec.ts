import { expect, it } from 'vitest'
import { parseNyxun } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxun(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('single add', _('axios', 'yarn remove axios'))

it('multiple', _('eslint @types/node', 'yarn remove eslint @types/node'))

it('-D', _('eslint @types/node -D', 'yarn remove eslint @types/node -D'))

it('global', _('eslint nyxi -g', 'npm uninstall -g eslint nyxi'))
