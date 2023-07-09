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

export const generateInterface = (json: TDataNode, name = "Translation") => {
  return `export interface ${name}Interface ${JSON.stringify(json, null, 2)
    .replace(/("\w+"): (".*")(,?\n)/g, "$1: string$3")
    .replace(/"(\w+)"\s*:/g, "$1:")};`;
};

export const pathAssign = (json: TDataNode, path: string, value: string) => {
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

export const pathRemove2 = (json: TDataNode, path: string) => {
  let curObj = json;
  const parts = path.split(".");
  let counter = 1;

  if (parts.length === 1) {
    delete curObj[parts[0]];
    return;
  }

  for (const part of parts) {
    if (counter++ < parts.length) {
      if (typeof curObj[part] == "object") {
        curObj = curObj[part] as TDataNode;
        continue;
      }

      throw `Incorrect path. Property ${part} level ${counter - 1}`;
    }

    if (typeof curObj[part] == "undefined")
      throw `Incorrect path. Property ${part} level ${counter - 1}`;

    delete curObj[part];
  }

  return json;
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
  let counter = 1;
  for (const part of parts) {
    if (typeof json[part] == "object") {
      json = json[part] as TDataNode;
      continue;
    }

    if (counter++ > parts.length) {
      throw `Path doesn't exist property ${part} level ${counter}`;
    }

    if (typeof json[part] == "undefined")
      throw `Path doesn't exist property ${part} level ${counter}`;

    return json[part];
  }

  return json;
};
