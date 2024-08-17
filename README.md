# CLI Toolbox

CLI Toolbox is a collection of opinionated generators designed to create minimalist templates, including folder structures, scaffolding frameworks, and bundlers.

#### [View CLI Toolbox Roadmap](/ROADMAP.md)

# 📦 CLI Toolbox - Project Generator

## Installation

```bash
$ pnpm add -D plop @cli-toolbox/project

# or

$ npm install -D plop @cli-toolbox/project
```

## Usage

After installing the packages, you have to create a `plopfile.{js,mjs}` in the root of your project.

```bash
# CommonJS
$ touch plopfile.js

# or

# ECMAScript modules
$ touch plopfile.mjs
```

Then, you can add the following code to your `plopfile.{js,mjs}`:

```js
// plopfile.js

/** @param {import('plop').NodePlopAPI} plop */
async function config(plop) {
  await plop.load('@cli-toolbox/project')
}

module.exports = config
```

OR

```js
// plopfile.mjs

/** @param {import('plop').NodePlopAPI} plop */
export default async function config(plop) {
  await plop.load('@cli-toolbox/project')
}
```

After that, you can run the following command:

```bash
# pnpm
$ pnpm plop

# or

# npm
$ npx plop
```
