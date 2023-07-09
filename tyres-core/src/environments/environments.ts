import { getEnvironments, setEnvironments } from "../config";

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
};

export const removeEnvironment = (envName: string) => {
  const environments = getEnvironments();

  setEnvironments(
    environments.filter((env) => env.toLowerCase() !== envName.toLowerCase())
  );
};
