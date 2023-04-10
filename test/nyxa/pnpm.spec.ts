import { expect, test } from 'vitest'
import { parseNyxa } from '../../src/commands'

const agent = 'pnpm'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxa(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('empty', _('', 'pnpm'))
test('foo', _('foo', 'pnpm foo'))
test('run test', _('run test', 'pnpm run test'))
