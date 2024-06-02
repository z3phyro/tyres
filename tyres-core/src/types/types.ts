export type TDictNode = {
  [id: string]: string;
};

export type TDataNode = {
  [id: string]: TDataNode | string | boolean;
};

export type TCoverage = { percent: number; paths: string[] };

export type TConfig = {
  translationsPath: string;
  featureFlagsPath: string;
  dictionaries: TDictNode;
  environments: string[];
  projectName: string;
};
