import { expect, test } from 'vitest'
import { parseNyxu } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string | null) {
  return () => {
    expect(
      parseNyxu(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test.fails('empty', _('', null))
test.fails('interactive', _('-i', null))
test.fails('interactive latest', _('-i --latest', null))
