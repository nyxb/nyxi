import { parseNyxi } from '../parse'
import { runCli } from '../runner'

runCli(
  (agent, _, hasLock) => parseNyxi(agent, ['--frozen-if-present'], hasLock),
  { autoInstall: true },
)
