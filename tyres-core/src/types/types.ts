export type TDictNode = {
  [id: string]: string;
};

export type TDataNode = {
  [id: string]: TDataNode | string | boolean;
};

export type TCoverage = { percent: number; paths: string[] };
