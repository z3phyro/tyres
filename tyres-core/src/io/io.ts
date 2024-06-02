import fs from "fs";
import { getFeaturesFolder, getFolder } from "../config";
import { TDataNode } from "../types/types";

export const createFolder = (folder: string) => {
  try {
    fs.mkdirSync(folder);
  } catch (e) {
    console.error(e);
  }
};

export const removeFolder = (folder: string) => {
  try {
    fs.rmSync(folder, { recursive: true });
  } catch (e) {
    console.error(e);
  }
};

export const writeStringFile = (
  filename: string,
  data: string,
  folder = getFolder()
) => {
  try {
    fs.writeFileSync(`${folder}${filename}`, data);
  } catch (e) {
    console.log(e);
  }
};

export const removeFile = (filename: string, folder = getFolder()) => {
  if (fs.existsSync(`${folder}${filename}`)) {
    fs.rmSync(`${folder}${filename}`);
  }
};

export const readTypedFile = (
  filename: string,
  folder = getFolder()
): TDataNode => {
  const result: TDataNode = {};

  try {
    if (fs.existsSync(`${folder}${filename}`)) {
      const raw = fs.readFileSync(`${folder}${filename}`).toString();
      const regex = /= ({.*})/s;
      const regResult = regex.exec(raw);
      const rawJSON = regResult![1]
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/: '(.*)'/g, ': "$1"');
      return JSON.parse(rawJSON) as TDataNode;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
};

export const readStringFile = (filename: string, folder = getFolder()) => {
  if (fs.existsSync(`${folder}${filename}`)) {
    return fs.readFileSync(`${folder}${filename}`);
  }
  throw `File ${filename} doesn't exist on folder ${folder}`;
};

export const readFile = (filename: string, folder = getFolder()): TDataNode => {
  let result: TDataNode = {};
  try {
    if (fs.existsSync(`${folder}${filename}`)) {
      result = JSON.parse(fs.readFileSync(`${folder}${filename}`).toString());
    }
  } catch (e) {
    console.error(e);
  }
  return result;
};

export const writeFile = (
  filename: string,
  data: string,
  folder = getFolder()
) => {
  console.info("writing file " + filename);

  if (filename.includes(".ts")) {
    data = "/* eslint-disable prettier/prettier */\n" + data;
  }

  fs.writeFileSync(`${folder}${filename}`, data);
};

export const writeTranslation = (
  json: TDataNode,
  dictName = "English",
  folder = getFolder()
) => {
  const result = `import type { TranslationInterface } from "./translation.interface"; 

export const ${dictName}Translation: TranslationInterface = ${JSON.stringify(
    json,
    null,
    2
  ).replace(/"(\w+)"\s*:/g, "$1:")};
`;

  writeFile(`${dictName.toLowerCase()}.translation.ts`, result, folder);
};

export const writeFeatureFlag = (
  json: TDataNode,
  envName = "development",
  folder = getFeaturesFolder()
) => {
  const result = `import type { FeatureFlagsInterface } from "./feature-flags.interface"; 

export const flags${envName[0].toUpperCase()}${envName.slice(
    1
  )}: FeatureFlagsInterface = ${JSON.stringify(json, null, 2).replace(
    /"(\w+)"\s*:/g,
    "$1:"
  )};
`;

  writeFile(`feature-flags.${envName.toLowerCase()}.ts`, result, folder);
};

export const fileExists = (filename: string, folder = getFolder()) => {
  return fs.existsSync(`${folder}${filename}`);
};
