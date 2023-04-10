import { expect, test } from 'vitest'
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

test('empty', _('', 'npm update'))
