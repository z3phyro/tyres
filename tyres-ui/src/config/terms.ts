import { slugify } from "~/utils/slugify.helper";

export const ETerms = {
  Dictionaries: "Dictionaries",
  i18n: "i18n",
  Coverage: "Coverage",
  FeatureFlags: "Feature Flags",
  Resources: "Resources",
  Paths: "Paths",
} as const;

const slugifyHandler = {
  get: (target: any, prop: any) => {
    return slugify(target[prop]);
  },
};

export const ETermsSlugged = new Proxy<typeof ETerms>(ETerms, slugifyHandler);
