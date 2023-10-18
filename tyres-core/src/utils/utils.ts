import { writeFile } from "../io";
import { TDataNode } from "../types/types";

export const clearEntries = (json: TDataNode, value = "") => {
  for (const key in json) {
    if (typeof json[key] == "string") {
      json[key] = value;
    } else if (typeof json[key] == "boolean") {
      json[key] = false;
    } else {
      clearEntries(json[key] as TDataNode, value);
    }
  }
};

export const writeInterface = (
  json: TDataNode,
  folder: string,
  name = "Translation",
  filename = "translation.interface.ts",
  dataType = "string"
) => {
  const result = generateInterface(json, name, dataType);
  writeFile(filename, result, folder);
};

export const generateInterface = (
  json: TDataNode,
  name = "Translation",
  dataType = "string"
) => {
  return `export interface ${name}Interface ${JSON.stringify(json, null, 2)
    .replace(/("\w+"): ((".*")|true|false)(,?\n)/g, `$1: ${dataType};\n`)
    .replace(/"(\w+)"\s*:/g, "$1:")};`;
};

export const pathAssign = (
  json: TDataNode,
  path: string,
  value: string | boolean
) => {
  let curObj: TDataNode = json;
  const parts = path.split(".");
  let counter = 1;
  for (const part of parts) {
    if (counter++ < parts.length) {
      if (typeof curObj[part] === "undefined") {
        curObj[part] = {};
        curObj = curObj[part] as TDataNode;
        continue;
      }

      if (typeof curObj[part] === "object") {
        curObj = curObj[part] as TDataNode;
        continue;
      }

      throw `Incorrect path. Property ${part} level ${counter - 1}`;
    }

    if (typeof curObj[part] == "object") {
      throw `Incorrect path. Property ${part} level ${counter - 1}`;
    }
    curObj[part] = value;
  }

  return json;
};

export const pathRemove = (json: TDataNode, path: string, level = 1) => {
  const parts = path.split(".");

  if (parts.length > 1) {
    const key = parts.shift() as string;

    if (typeof json[key] === "object") {
      pathRemove(json[key] as TDataNode, parts.join("."), ++level);
      return;
    } else {
      throw `Incorrect path ${parts.join(
        "."
      )} on level ${level} is not an object`;
    }
  }

  if (typeof json[path] === "undefined") {
    throw `Incorrect path. Property ${path} level ${level}`;
  }

  delete json[path];
};

export const pathExists = (json: TDataNode, path: string): boolean => {
  let curObj: TDataNode = json;
  const parts = path.split(".");
  let counter = 1;
  for (const part of parts) {
    if (counter++ < parts.length) {
      if (typeof curObj[part] == "object") {
        curObj = curObj[part] as TDataNode;
        continue;
      }

      return false;
    }

    if (typeof curObj[part] == "undefined") return false;

    return true;
  }

  return false;
};

export const pathGet = (
  json: TDataNode,
  path: string
): string | boolean | TDataNode => {
  const parts = path.split(".");
  let counter = 0;
  for (const part of parts) {
    counter++;
    if (typeof json[part] == "object") {
      json = json[part] as TDataNode;
      continue;
    }

    if (counter > parts.length) {
      throw `Path doesn't exist property ${part} level ${counter}`;
    }

    if (typeof json[part] == "undefined")
      throw `Path doesn't exist property ${part} level ${counter}`;

    return json[part];
  }

  return json;
};

export const surfObjectKeys = (
  json: TDataNode,
  trail = "",
  list: string[] = []
) => {
  const keys = Object.keys(json);

  for (const key of keys) {
    const path = `${trail ? trail + "." : ""}${key}`;
    if (typeof json[key] == "object")
      surfObjectKeys(json[key] as TDataNode, path, list);
    else {
      console.log(path, json[key]);
      list.push(path);
    }
  }
};
