# Changelog


## v0.0.21...main

[compare changes](https://github.com/nyxb/nyxi/compare/v0.0.21...main)


### 🚀 Enhancements

  - **nyxinit): add nyxinit command to create package.json and tsconfig.json files 🐛 fix(init.ts:** Fix function name from initPackageJson to createConfigFiles to improve semantics The nyxinit command was added to create package.json and tsconfig.json files. The initPackageJson function was renamed to createConfigFiles to better reflect its purpose. The createConfigFiles function now creates both package.json and tsconfig.json files. The initTsConfig function was moved inside createConfigFiles. The createConfigFiles function now uses the @tyck/prompts package to prompt the user to select which file to create. The tsconfig.json file was formatted to improve readability. ([f98c02b](https://github.com/nyxb/nyxi/commit/f98c02b))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

