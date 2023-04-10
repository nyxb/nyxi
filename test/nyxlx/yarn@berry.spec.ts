import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxlx(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('single uninstall', _('esbuild', 'yarn dlx esbuild'))
test('multiple', _('esbuild --version', 'yarn dlx esbuild --version'))
