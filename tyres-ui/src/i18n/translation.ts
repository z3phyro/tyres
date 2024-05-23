/* eslint-disable prettier/prettier */
import { EnglishTranslation } from "./english.translation";
import { SpanishTranslation } from "./spanish.translation";
import { KlingonnTranslation } from "./klingonn.translation";

export default {
  "en": EnglishTranslation,
  "es": SpanishTranslation,
  "kl": KlingonnTranslation,
} as const;
