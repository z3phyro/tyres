import { getDictionaries, getFolder, setDictionaries } from "../config";
import { readTypedFile, removeFile, writeFile, writeTranslation } from "../io";
import { TDataNode } from "../types/types";
import { clearEntries } from "../utils";

export const writeDictionaries = (dicts: TDataNode) => {
  const keys = Object.keys(dicts);
  let result = "";

  for (const key of keys) {
    result += `import { ${dicts[key]}Translation } from "./${(
      dicts[key] as string
    ).toLowerCase()}.translation";\n`;
  }

  result += "\n";
  result += "export default {\n";
  for (const key of keys) {
    result += `  "${key}": ${dicts[key]}Translation,\n`;
  }
  result += "} as const;\n";

  writeFile("translation.ts", result);
};

export const initDictionaries = () => {
  writeDictionaries(getDictionaries());

  console.info("Dictionaries initialized \n");
};

export const initNewTranslation = (name: string, folder = getFolder()) => {
  const dicts = getDictionaries();
  const defaultKey = Object.values(dicts)[0];

  const json = readTypedFile(
    `${(defaultKey as string).toLowerCase()}.translation.ts`,
    folder
  );
  clearEntries(json);
  writeTranslation(json, name, folder);
};

export const removeTranslationFile = (name: string) => {
  removeFile(`${name}.translation.ts`);
};

export const removeDictionary = (shortName: string) => {
  const dicts = getDictionaries();
  const name = dicts[shortName] as string;
  delete dicts[shortName];

  writeDictionaries(dicts);
  removeTranslationFile(name);
  setDictionaries(dicts);

  console.info(`Dictionary ${name} Removed`);
};

export const addDictionary = (shortName: string, name: string) => {
  console.info("Adding new dict");
  const dicts = getDictionaries();
  dicts[shortName] = name;

  writeFile("dictionaries.json", JSON.stringify(dicts, null, 2));
  writeDictionaries(dicts);
  initNewTranslation(name);

  console.info(`Added ${name} dictionary`);
};

export const listDictionaries = () => {
  const dicts = getDictionaries();

  console.info("Dictionaries: \n");
  for (const dict of Object.entries(dicts)) {
    console.info(`${dict[0]} ${dict[1]} `);
  }
};
