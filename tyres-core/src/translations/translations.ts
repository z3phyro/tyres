import { initDictionaries, writeDictionaries } from "../dictionaries";
import { readFile, readTypedFile, writeFile, writeTranslation } from "../io";
import { generateInterface, pathAssign, pathRemove } from "../utils";
import { TCoverage, TDataNode, TDictNode } from "../types";
import { initConfigs, getDictionaries } from "../config";

export const surfTranslations = (
  json: TDataNode,
  trail = "",
  list: string[] = []
) => {
  const keys = Object.keys(json);

  for (const key of keys) {
    const path = `${trail ? trail + "." : ""}${key}`;
    if (typeof json[key] == "object")
      surfTranslations(json[key] as TDataNode, path, list);
    else {
      console.log(path, json[key]);
      list.push(path);
    }
  }
};

export const listTranslation = () => {
  const json = readTranslation();
  surfTranslations(json);
};

export const addTranslation = (
  entry_path: string,
  default_values: string[]
) => {
  try {
    const dicts = getDictionaries();
    const languages = Object.values(dicts);

    let count = 0;
    for (const dict of languages) {
      const json = readTranslation(dict);
      pathAssign(json, entry_path, default_values[count] || "-");
      writeTranslation(json, dict);

      if (count == 0) {
        writeInterface(json);
      }

      count++;
    }

    console.log(
      `Entry added ${entry_path} ${default_values} in ${count} Dictionaries \n`
    );
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export const writeInterface = (json: TDataNode) => {
  const result = generateInterface(json);
  writeFile("translation.interface.ts", result);
};

export const readTranslation = (dictName = "english"): TDataNode => {
  return readTypedFile(`${dictName.toLowerCase()}.translation.ts`);
};

export const removeTranslation = (entry_path: string) => {
  const dicts = getDictionaries();

  let count = 0;
  for (const dict in dicts) {
    const json = readTranslation(dicts[dict]);

    try {
      pathRemove(json, entry_path);
    } catch (e) {
      console.log(e);
    }

    writeTranslation(json, dicts[dict]);
    if (count == 0) {
      writeInterface(json);
    }

    count++;
  }

  console.log(`Entry removed ${entry_path} for all languages\n`);
};

export const initTranslations = () => {
  initConfigs();
  initDictionaries();

  const json = [
    {
      general: {
        hello: "Hello World!",
        about: "About",
      },
      about: {
        company: "Company",
      },
    },
    {
      general: {
        hello: "Hola Mundo!",
        about: "Acerca de",
      },
      about: {
        company: "-",
      },
    },
  ];

  const dicts = getDictionaries();

  writeInterface(json[0]);
  let c = 0;
  for (const dict of Object.values(dicts)) {
    writeTranslation(json[c++], dict);
  }
};

export const translationImport = () => {
  const dicts = getDictionaries();
  writeDictionaries(dicts);

  const count = 0;
  for (const dict of Object.values(dicts)) {
    const json = readFile(`${dict.toLowerCase()}.translation.json`);
    if (count == 0) writeInterface(json);

    writeTranslation(json, dict);
  }
};

export const getCoverage = (dict: TDataNode, verbose = false): TCoverage => {
  let totalKeys = 0;
  let translatedKeys = 0;
  const result: TCoverage = {
    percent: 0,
    paths: [],
  };

  const arraySurfer = (json: TDataNode, trail: string) => {
    const keys = Object.keys(json);

    for (const key of keys) {
      const path = `${trail ? trail + "." : ""}${key}`;
      if (typeof json[key] == "object")
        arraySurfer(json[key] as TDataNode, path);
      else {
        totalKeys++;
        if (json[key] && json[key] != "-") {
          translatedKeys++;
        } else {
          result.paths.push(path);
          if (verbose) {
            console.info(path);
          }
        }
      }
    }
  };

  arraySurfer(dict, "");

  result.percent = (translatedKeys * 100) / totalKeys;

  return result;
};

export const getAllCoverage = () => {
  const dicts = getDictionaries();
  const result: { [id: string]: TCoverage } = {};

  for (const dict of Object.keys(dicts)) {
    const json = readTypedFile(`${dicts[dict].toLowerCase()}.translation.ts`);
    result[dict] = getCoverage(json as TDictNode);
  }

  return result;
};

export const translationCoverage = (language: string | undefined) => {
  const dicts = getDictionaries();
  if (!language) {
    for (const dict of Object.keys(dicts)) {
      console.log(
        `${dict} ${dicts[dict]} ${
          getCoverage(
            readTypedFile(
              `${dicts[dict].toLowerCase()}.translation.ts`
            ) as TDictNode
          ).percent
        }`
      );
    }
  } else {
    let index = language.toLowerCase();

    if (dicts[index]) {
      index = dicts[index];
    }
    console.log(
      `${index} ${getCoverage(
        readTypedFile(`${index.toLowerCase()}.translation.ts`) as TDictNode,
        true
      )}%`
    );
  }
};

export const updateTranslation = (
  dictName: string,
  path: string,
  newValue: string
) => {
  const json = readTranslation(dictName);

  pathAssign(json, path, newValue);

  writeTranslation(json, dictName);
};
