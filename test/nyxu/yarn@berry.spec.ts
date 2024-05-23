import { expect, it } from 'vitest'
import { parseNyxu } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxu(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('empty', _('', 'yarn up'))

it('interactive', _('-i', 'yarn up -i'))
