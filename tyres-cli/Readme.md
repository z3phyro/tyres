# Tyres-CLI

CLI inspired by prisma, to create and mantain statically typed translations on any typescript project.

# Installation

## Install the dependency
```bash
npm i -D @z3phyro/tyres-cli
```

```bash
yarn add -D @z3phyro/tyres-cli
```

## Setup project package.json script

```json
{
  "scripts": {
    "tyres": "node ./node_modules/.bin/tyres"
  }
}
```

## Or use an alias
```bash
alias tyres="node ./node_modules/.bin/tyres"
```

## Run it!

```bash
npm run tyres
```

## Or if you have an alias
```
tyres
```

# Use

## To see the help
```bash
tyres
```

## To initialize the translations (First step)
```bash
tyres init
```

## To add a translation
```bash
tyres add <entry.path> [values...]
```

Values need to be in the same order as the dicts in the dictionaries.json file

## To see the translation coverage per language 

```bash
tyres coverage
```

## To see the translation coverage of a particular language 

```bash
tyres coverage [language-shortname]
```
