import { expect, it } from 'vitest'
import { parseNyxu } from '../../src/commands'

const agent = 'npm'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxu(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('empty', _('', 'npm update'))
