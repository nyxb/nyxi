import { expect, test } from 'vitest'
import { parseNyxa } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxa(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('empty', _('', 'yarn'))
test('foo', _('foo', 'yarn foo'))
test('run test', _('run test', 'yarn run test'))
