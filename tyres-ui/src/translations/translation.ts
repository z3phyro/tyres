/* eslint-disable prettier/prettier */
import { EnglishTranslation } from "./english.translation";
import { SpanishTranslation } from "./spanish.translation";
import { ElendilTranslation } from "./elendil.translation";

export default {
  "en": EnglishTranslation,
  "es": SpanishTranslation,
  "el": ElendilTranslation,
} as const;
