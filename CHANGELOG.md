# Changelog


## v0.0.31

[compare changes](https://github.com/nyxblabs/nyxi/compare/v0.0.30...v0.0.31)


### 🚀 Enhancements

  - **karium.config.ts): add buildkarium configuration file to define build options 🚚 chore(package.json): remove unbuild package and add buildkarium package as a dependency 🐛 fix(init.ts:** Fix typos and update package.json fields to match the new project name and structure. Add support for opening files with Visual Studio Code or Visual Studio Code Insider. ([bfaace9](https://github.com/nyxblabs/nyxi/commit/bfaace9))

### 🏡 Chore

  - **release:** V0.0.30 ([4ce639d](https://github.com/nyxblabs/nyxi/commit/4ce639d))
  - **package.json): update packageManager to pnpm@8.5.0 🔧 chore(package.json): add consolji dependency to dependencies 🔧 chore(package.json:** Move engines object to the top level of the file for better readability ([41b06fe](https://github.com/nyxblabs/nyxi/commit/41b06fe))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.30

[compare changes](https://github.com/nyxblabs/nyxi/compare/v0.0.29...v0.0.30)


### 🏡 Chore

  - **README.md): update license badge source and repository URL 🔧 chore(package.json:** Update repository URL and bugs URL The license badge source and repository URL were updated to reflect the new repository location. The repository URL and bugs URL in package.json were also updated to reflect the new repository location. ([45f185f](https://github.com/nyxblabs/nyxi/commit/45f185f))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.29

[compare changes](https://github.com/nyxb/nyxi/compare/v0.0.28...v0.0.29)


### 🏡 Chore

  - **github-assets:** Add cover image for Nyxi GitHub repository This commit adds a new cover image for the Nyxi GitHub repository. The image is located in the .github/assets directory and is named cover-github-nyxi.png. The image is a visual representation of the Nyxi project and will be used as the cover image for the repository. ([2169a88](https://github.com/nyxb/nyxi/commit/2169a88))
  - **package.json:** Remove 'nyxr test' command from release script The 'nyxr test' command was removed from the release script as it is not necessary to run tests before publishing a new version. ([3b54c14](https://github.com/nyxb/nyxi/commit/3b54c14))

### 🎨 Styles

  - **README.md): remove background images and update cover image 🚚 chore(README.md): update homepage link 📝 docs(package.json:** Update package description and add packageManager field The background images were removed from the README.md file and the cover image was updated to a new one. The homepage link was updated to a new URL. The package description was updated to "Always right package manager" to better reflect the purpose of the package. The packageManager field was added to the package.json file to specify the version of pnpm used. ([9fe61c8](https://github.com/nyxb/nyxi/commit/9fe61c8))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.21...main

[compare changes](https://github.com/nyxb/nyxi/compare/v0.0.21...main)


### 🚀 Enhancements

  - **nyxinit): add nyxinit command to create package.json and tsconfig.json files 🐛 fix(init.ts:** Fix function name from initPackageJson to createConfigFiles to improve semantics The nyxinit command was added to create package.json and tsconfig.json files. The initPackageJson function was renamed to createConfigFiles to better reflect its purpose. The createConfigFiles function now creates both package.json and tsconfig.json files. The initTsConfig function was moved inside createConfigFiles. The createConfigFiles function now uses the @tyck/prompts package to prompt the user to select which file to create. The tsconfig.json file was formatted to improve readability. ([f98c02b](https://github.com/nyxb/nyxi/commit/f98c02b))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

