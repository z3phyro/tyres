import { Command } from "commander";
import { initTranslations } from "@z3phyro/tyres-core";
import {
  addTranslation,
  listTranslation,
  removeTranslation,
  translationCoverage,
  translationImport,
} from "@z3phyro/tyres-core";
import {
  addDictionary,
  listDictionaries,
  removeDictionary,
} from "@z3phyro/tyres-core";
const figlet = require("figlet");

console.log(
  "\n ----------------------------- \n" +
    figlet.textSync("Tyres") +
    "\n ----------------------------- \n"
);

const program = new Command();

program
  .command("init")
  .description("Initialize translations")
  .action(initTranslations);

program
  .command("list")
  .description("Lists the dictionaries entries")
  .action(listTranslation);

program
  .command("add <entry.path> [values...]")
  .description(
    "Adds a new entry. Entry path is the index inside the translation object separated by periods. Values better be typed within 'simple quotes' because there are issues with double quotes: E.g. add general.bye 'Bye' 'Adios' "
  )
  .action((entryPath: string, values: string[]) => {
    addTranslation(entryPath, values);
  });

program
  .command("remove <entry.path>")
  .description("Removes an entry from the translations")
  .action(removeTranslation);

program
  .command("dict-list")
  .description("Lists the dictionaries")
  .action(listDictionaries);

program
  .command("dict-new <short_name> <long_name>")
  .description("Adds a new dictionary")
  .action(addDictionary);

const dictRemove = program
  .command("dict-remove <short_name>")
  .description("Removes a dictionary")
  .action(removeDictionary);

program
  .command("import")
  .description(
    "Imports json files named eg: 'english.translation.json' into the typed files. Useful for importing common translation files."
  )
  .action(translationImport);

program
  .command("coverage [language]")
  .description("Prints the coverage of the translation through languages")
  .action(translationCoverage);

program.parse(process.argv);
