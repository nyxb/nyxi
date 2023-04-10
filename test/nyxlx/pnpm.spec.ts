import { expect, test } from 'vitest'
import { parseNyxlx } from '../../src/commands'

const agent = 'pnpm'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parseNyxlx(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

test('single uninstall', _('esbuild', 'pnpm dlx esbuild'))
test('multiple', _('esbuild --version', 'pnpm dlx esbuild --version'))
