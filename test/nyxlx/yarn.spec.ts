import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'yarn'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxlx(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('single uninstall', _('esbuild', 'npx esbuild'))
test('multiple', _('esbuild --version', 'npx esbuild --version'))
