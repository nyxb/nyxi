import fs from 'node:fs'
import consolji from 'consolji'

export async function initPackageJson() {
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

export async function initTsConfig() {
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
