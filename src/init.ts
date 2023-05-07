import fs from 'node:fs'
import { exec } from 'node:child_process'
import consolji from 'consolji'
import { multiselect, select } from '@tyck/prompts'

export async function createConfigFiles() {
  async function initPackageJson() {
    if (fs.existsSync('package.json')) {
      consolji.log('⚠️ package.json already exists.')
    }
    else {
      const packageJson = {
        name: 'example',
        version: '0.0.1',
        description: '',
        author: '',
        license: 'MIT',
        hompage: 'https://💻nyxb.ws',
        repository: {
          type: 'git',
          url: 'git+https://example.com.git',
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
      consolji.log('🎉 package.json created.')
    }
  }

  async function initTsConfig() {
    if (fs.existsSync('tsconfig.json')) {
      consolji.log('⚠️ tsconfig.json already exists.')
    }
    else {
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
      consolji.log('🎉 tsconfig.json created.')
    }
  }

  const createConfigs = await multiselect({
    message: 'Which files do you want to create?',
    options: [
      { value: 'package.json', label: 'Create package.json' },
      { value: 'tsconfig.json', label: 'Create tsconfig.json' },
    ],
  }) as string[]

  if (createConfigs.includes('package.json'))
    await initPackageJson()

  if (createConfigs.includes('tsconfig.json'))
    await initTsConfig()

  const openWithVSCode = await select({
    message: 'Do you want to open the files with Visual Studio Code?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  })

  if (openWithVSCode === 'yes') {
    exec('code .', (error, stdout, stderr) => {
      if (error) {
        consolji.error(`exec error: ${error}`)
        return
      }
      consolji.log(`stdout: ${stdout}`)
      consolji.error(`stderr: ${stderr}`)
    })
  }

  return createConfigs
}
