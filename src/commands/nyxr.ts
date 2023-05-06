import c from 'kleur'
import { Fzf } from 'fzf'
import * as tyck from '@tyck/prompts'
import { consolji } from 'consolji'
import { dump, load } from '../storage'
import { parseNyxr } from '../parse'
import { getPackageJSON } from '../fs'
import { runCli } from '../runner'

interface MyChoice {
  title: string
  value: string
  description: string
}

runCli(async (agent, args, ctx) => {
  const storage = await load()

  if (args[0] === '-') {
    if (!storage.lastRunCommand) {
      consolji.error('No last command found')
      process.exit(1)
    }
    args[0] = storage.lastRunCommand
  }

  if (args.length === 0) {
    // support https://www.npmjs.com/package/npm-scripts-info conventions
    const pkg = getPackageJSON(ctx?.cwd)
    const scripts = pkg.scripts || {}
    const scriptsInfo = pkg['scripts-info'] || {}

    const names = Object.entries(scripts) as [string, string][]

    if (!names.length)
      return

    const raw = names
      .filter(i => !i[0].startsWith('?'))
      .map(([key, cmd]) => ({
        key,
        cmd,
        description: scriptsInfo[key] || scripts[`?${key}`] || cmd,
      }))

    const terminalColumns = process.stdout?.columns || 80

    function limitText(text: string, maxWidth: number) {
      if (text.length <= maxWidth)
        return text
      return `${text.slice(0, maxWidth)}${c.dim('…')}`
    }
    const choices: MyChoice[] = raw.map(({ key, description }) => ({
      title: key,
      value: key,
      description: limitText(description, terminalColumns - 15),
    }))

    const _fzf = new Fzf(raw, {
      selector: item => `${item.key} ${item.description}`,
      casing: 'case-insensitive',
    })

    if (storage.lastRunCommand) {
      const last = choices.find(i => i.value === storage.lastRunCommand)
      if (last)
        choices.unshift(last)
    }

    try {
      const result = (await tyck.select<{ value: string; label: string }[], string>({
        message: 'script to run',
        options: choices.map(({ title, value }) => ({
          label: title,
          value,
        })),
      })) as string
      if (tyck.isCancel(result)) {
        tyck.cancel(c.red('never mind.'))
        process.exit(0)
      }
      if (!result)
        return
      args.push(result)
    }
    catch (e) {
      process.exit(1)
    }
  }

  if (storage.lastRunCommand !== args[0]) {
    storage.lastRunCommand = args[0]
    dump()
  }

  return parseNyxr(agent, args)
})
