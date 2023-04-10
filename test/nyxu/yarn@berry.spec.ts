import { expect, test } from 'vitest'
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

test('empty', _('', 'yarn up'))

test('interactive', _('-i', 'yarn up -i'))
