import fs from 'node:fs'
import consolji from 'consolji'
import { select } from '@tyck/prompts'

export async function createConfigFiles(): Promise<any> {
  async function initPackageJson() {
    const packageJson = {
      name: 'example',
      version: '0.0.1',
      description: '',
      author: '',
      license: 'MIT',
      hompage: 'https://💻nyxb.ws',
      repository: {
        type: 'git',
        url: 'git+https://exaple.com.git',
      },
      bugs: {
        url: 'https://github.com/example/issues',
      },
      bin: {
        example: '/dist/example.js',
      },
      main: 'example.js',
      module: 'example.js',
      types: 'example.d.ts',
      exports: {
        '.': {
          require: './dist/example.js',
          import: './dist/example.mjs',
          types: './dist/example.d.ts',
        },
      },
      scripts: {
        test: 'echo "Happy hacking" && 💙',
      },
      dependencies: {},
      devDependencies: {},
      files: [],
      keywords: [],
    }

    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
    consolji.log('🎉package.json created.')
  }

  async function initTsConfig() {
    const tsconfig = {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext',
        moduleResolution: 'Node',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      },
      include: ['src'],
    }

    fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2))
    consolji.log('🎉tsconfig.json created.')
  }

  const createConfig = await select({
    message: 'Which file do you want to create?',
    options: [
      { value: 'package.json', label: 'Create package.json' },
      { value: 'tsconfig.json', label: 'Create tsconfig.json' },
    ],
  })

  if (createConfig === 'package.json')
    await initPackageJson()

  else if (createConfig === 'tsconfig.json')
    await initTsConfig()

  return createConfig
}
