import { Command } from "commander";
import {
  addEnvironment,
  initTranslations,
  removeEnvironment,
} from "@z3phyro/tyres-core";
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
import { listEnvironments } from "@z3phyro/tyres-core";
const figlet = require("figlet");

console.log(
  "\n ----------------------------- \n" +
    figlet.textSync("Tyres") +
    "\n ----------------------------- \n",
);

const program = new Command();

program
  .command("init")
  .description("Initialize resources")
  .action(initTranslations);

const entry = program
  .command("entry")
  .description("Operations with translation resources");

entry
  .command("list")
  .description("Lists the translation interface entries")
  .action(listTranslation);

entry
  .command("add <entry.path> [values...]")
  .description(
    "Adds a new entry. Entry path is the index inside the translation object separated by periods. Values better be typed within 'simple quotes' because there are issues with double quotes: E.g. add general.bye 'Bye' 'Adios' ",
  )
  .action((entryPath: string, values: string[]) => {
    addTranslation(entryPath, values);
  });

entry
  .command("remove <entry.path>")
  .description("Removes an entry from the translations")
  .action(removeTranslation);

const dict = program
  .command("dict")
  .description("Operations with dictionaries");

dict
  .command("list")
  .description("Lists the dictionaries")
  .action(listDictionaries);

dict
  .command("add <short_name> <long_name>")
  .description("Adds a new dictionary")
  .action(addDictionary);

dict
  .command("remove <short_name>")
  .description("Removes a dictionary")
  .action(removeDictionary);

dict
  .command("import")
  .description(
    "Imports json files named eg: 'english.translation.json' into the typed files. Useful for importing common translation files.",
  )
  .action(translationImport);

program
  .command("coverage [language]")
  .description("Prints the coverage of the translation through languages")
  .action(translationCoverage);

const env = program
  .command("env")
  .description("Add, list or remove environments");

env.command("list").description("List environments").action(listEnvironments);

env
  .command("add <env_name>")
  .description("Adds a new environment")
  .action((env: string) => {
    addEnvironment(env);
    listEnvironments();
  });

env
  .command("remove <env_name>")
  .description("Removes an environment")
  .action((env: string) => {
    removeEnvironment(env);
    listEnvironments();
  });

program.parse(process.argv);
