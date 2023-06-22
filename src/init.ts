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
        name: 'ext-name',
        version: '0.0.0',
        description: '',
        author: '',
        license: 'MIT',
        homepage: 'https://💻nyxb.ws',
        repository: {
          type: 'git',
          url: 'git+https://github.com/nyxb/ext-name.git',
        },
        bugs: {
          url: 'https://github.com/nyxb/ext-name/issues',
        },
        bin: {
          example: '/dist/index.js',
        },
        main: 'dist/index.cjs',
        module: 'dist/index.mjs',
        types: 'dist/index.d.ts',
        exports: {
          '.': {
            require: './dist/index.cjs',
            import: './dist/index.mjs',
            types: './dist/index.d.ts',
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
    // First, check if Visual Studio Code and Visual Studio Code Insider are installed.
    exec('which code', (errorVSCode, stdoutVSCode) => {
      exec('which code-insiders', (errorVSCodeInsider, stdoutVSCodeInsider) => {
        if (stdoutVSCode && stdoutVSCodeInsider) {
          // Both are installed, ask the user which one he wants to use
          select({
            message: 'Do you want to open the files with Visual Studio Code or Visual Studio Code Insider?',
            options: [
              { value: 'code', label: 'Visual Studio Code' },
              { value: 'code-insiders', label: 'Visual Studio Code Insider' },
            ],
          }).then((choice) => {
            exec(`${choice} .`, (error, stdout, stderr) => {
              if (error) {
                consolji.error(`exec error: ${error}`)
                return
              }
              consolji.log(`stdout: ${stdout}`)
              consolji.error(`stderr: ${stderr}`)
            })
          })
        }
        else if (stdoutVSCode) {
          // Only Visual Studio Code is installed
          exec('code .', (error, stdout, stderr) => {
            if (error) {
              consolji.error(`exec error: ${error}`)
              return
            }
            consolji.log(`stdout: ${stdout}`)
            consolji.error(`stderr: ${stderr}`)
          })
        }
        else if (stdoutVSCodeInsider) {
          // Only Visual Studio Code Insider is installed
          exec('code-insiders .', (error, stdout, stderr) => {
            if (error) {
              consolji.error(`exec error: ${error}`)
              return
            }
            consolji.log(`stdout: ${stdout}`)
            consolji.error(`stderr: ${stderr}`)
          })
        }
        else {
          consolji.log('Neither Visual Studio Code nor Visual Studio Code Insider is installed.')
        }
      })
    })
  }

  return createConfigs
}
