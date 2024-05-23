import { expect, it } from 'vitest'
import { parseNyxr } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string) {
   return () => {
      expect(
         parseNyxr(agent, arg.split(' ').filter(Boolean)),
      ).toBe(
         expected,
      )
   }
}

it('empty', _('', 'bun run start'))

it('script', _('dev', 'bun run dev'))

it('script with arguments', _('build --watch -o', 'bun run build --watch -o'))

it('colon', _('build:dev', 'bun run build:dev'))
