# nyxi

~~*`npm i` in a pnpm project, again? Sh\*t!*~~

**nyxi** - use the right package manager

<br>

<pre>
npm i -g <b>@nyxb/nyxi</b>
</pre>

<a href='https://docs.npmjs.com/cli/v6/commands/npm'>npm</a> · <a href='https://yarnpkg.com'>yarn</a> · <a href='https://pnpm.js.org/en/'>pnpm</a> · <a href='https://bun.sh/'>bun</a>


<br>


### `nyxi` - install

```bash
nyxi

# npm install
# yarn install
# pnpm install
# bun install
```

```bash
nyxi preact

# npm i preact
# yarn add preact
# pnpm add preact
# bun add preact
```

```bash
nyxi @types/node -D

# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
# bun add -d @types/node
```

```bash
nyxi --frozen

# npm ci
# yarn install --frozen-lockfile (Yarn 1)
# yarn install --immutable (Yarn Berry)
# pnpm install --frozen-lockfile
# bun install --no-save
```

```bash
nyxi -g eslint

# npm i -g eslint
# yarn global add eslint (Yarn 1)
# pnpm add -g eslint
# bun add -g eslint

# this uses default agent, regardless your current working directory
```

<br>

### `nyxr` - run

```bash
nyxr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000
```

```bash
nyxrr

# interactively select the script to run
# supports https://www.npmjs.com/package/npm-scripts-info convention
```

```bash
nyxr -

# rerun the last command
```

<br>

### `nyxlx` - download & execute

```bash
nyxlx preact

# npx preact
# yarn dlx preact
# pnpm dlx preact
# bunx preact
```

```bash
```

<br>

### `nyxu` - upgrade

```bash
nyxu

# (not available for bun)
# npm upgrade
# yarn upgrade (Yarn 1)
# yarn up (Yarn Berry)
# pnpm update
```

```bash
nyxu -i

# (not available for npm & bun)
# yarn upgrade-interactive (Yarn 1)
# yarn up -i (Yarn Berry)
# pnpm update -i
```

<br>

### `nun` - uninstall

```bash
nyxun unbuild

# npm uninstall unbuild
# yarn remove unbuild
# pnpm remove unbuild
# bun remove unbuild
```

```bash
nyxun -g silent

# npm uninstall -g silent
# yarn global remove silent
# pnpm remove -g silent
# bun remove -g silent
```

<br>

### `nyxci` - clean install

```bash
nyxci

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
# bun install --no-save
```

if the corresponding node manager is not present, this command will install it globally along the way.

<br>

### `nyxa` - agent alias

```bash
nyxa

# npm
# yarn
# pnpm
# bun
```

```bash
nyxa run foo

# npm run foo
# yarn run foo
# pnpm run foo
# bun run foo
```

<br>

### Change Directory

```bash
nyxi -C packages/foo preact
nyxr -C playground dev
```

<br>

### Config

```ini
; ~/.nyxirc

; fallback when no lock found
defaultAgent=npm # default "prompt"

; for global installs
globalAgent=npm
```

```bash
# ~/.bashrc

# custom configuration file path
export NYXI_CONFIG_FILE="$HOME/.config/nyxi/nyxirc"
```

<br>

### How?

**nyxi** assumes that you work with lockfiles (and you should)

Before it runs, it will detect your `yarn.lock` / `pnpm-lock.yaml` / `package-lock.json` / `bun.lockb` to know current package manager (or `packageManager` field in your packages.json if specified), and runs the [corresponding commands](https://github.com/nyxb/nyxi/blob/main/src/agents.ts).
