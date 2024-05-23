import { expect, it } from 'vitest'
import { parseNyxi } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxi(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('empty', _('', 'yarn install'))

it('single add', _('axios', 'yarn add axios'))

it('multiple', _('eslint @types/node', 'yarn add eslint @types/node'))

it('-D', _('eslint @types/node -D', 'yarn add eslint @types/node -D'))

it('global', _('eslint nyxi -g', 'npm i -g eslint nyxi'))

it('frozen', _('--frozen', 'yarn install --immutable'))
