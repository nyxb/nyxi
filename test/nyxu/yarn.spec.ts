import { expect, test } from 'vitest'
import { parseNyxu } from '../../src/commands'

const agent = 'yarn'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxu(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('empty', _('', 'yarn upgrade'))

test('interactive', _('-i', 'yarn upgrade-interactive'))

test('interactive latest', _('-i --latest', 'yarn upgrade-interactive --latest'))
