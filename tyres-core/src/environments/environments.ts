import { getEnvironments, setEnvironments } from "../config";
import {
  createFileForEnvironment,
  removeFileFromEnvironment,
} from "../feature-flags";

export const listEnvironments = () => {
  const environments = getEnvironments();

  for (const env of environments) {
    console.log(env);
  }
};

export const addEnvironment = (envName: string) => {
  const environments = getEnvironments();

  environments.push(envName);
  setEnvironments(Array.from(new Set(environments)));
  createFileForEnvironment(envName.toLowerCase());
};

export const removeEnvironment = (envName: string) => {
  const environments = getEnvironments();

  setEnvironments(
    environments.filter((env) => env.toLowerCase() !== envName.toLowerCase())
  );
  removeFileFromEnvironment(envName.toLowerCase());
};
