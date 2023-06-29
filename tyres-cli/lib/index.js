#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const tyres_core_1 = require("@z3phyro/tyres-core");
const tyres_core_2 = require("@z3phyro/tyres-core");
const tyres_core_3 = require("@z3phyro/tyres-core");
const figlet = require("figlet");
console.log("\n ----------------------------- \n" +
    figlet.textSync("Tyres") +
    "\n ----------------------------- \n");
const program = new commander_1.Command();
program
    .command("init")
    .description("Initialize translations")
    .action(tyres_core_1.initTranslations);
program
    .command("list")
    .description("Lists the dictionaries entries")
    .action(tyres_core_2.listTranslation);
program
    .command("add <entry.path> [values...]")
    .description("Adds a new entry. Entry path is the index inside the translation object separated by periods. Values better be typed within 'simple quotes' because there are issues with double quotes: E.g. add general.bye 'Bye' 'Adios' ")
    .action((entryPath, values) => {
    (0, tyres_core_2.addTranslation)(entryPath, values);
});
program
    .command("remove <entry.path>")
    .description("Removes an entry from the translations")
    .action(tyres_core_2.removeTranslation);
program
    .command("dict-list")
    .description("Lists the dictionaries")
    .action(tyres_core_3.listDictionaries);
program
    .command("dict-new <short_name> <long_name>")
    .description("Adds a new dictionary")
    .action(tyres_core_3.addDictionary);
const dictRemove = program
    .command("dict-remove <short_name>")
    .description("Removes a dictionary")
    .action(tyres_core_3.removeDictionary);
program
    .command("import")
    .description("Imports json files named eg: 'english.translation.json' into the typed files. Useful for importing common translation files.")
    .action(tyres_core_2.translationImport);
program
    .command("coverage [language]")
    .description("Prints the coverage of the translation through languages")
    .action(tyres_core_2.translationCoverage);
program.parse(process.argv);
//# sourceMappingURL=index.js.map