import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxlx(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('single uninstall', _('esbuild', 'bunx esbuild'))
test('multiple', _('esbuild --version', 'bunx esbuild --version'))
